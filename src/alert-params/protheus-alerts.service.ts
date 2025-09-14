// protheus-alerts.service.ts
import { Injectable } from '@nestjs/common';
import { ProtheusAlertDto } from './dto/protheus-alert.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { HttpService } from '@nestjs/axios';
import { AlertParamsService } from '../alert-params/alert-params.service';
@Injectable()
export class ProtheusAlertsService {
    constructor(
        private readonly prisma: PrismaService, 
        private readonly email: EmailService,
        private readonly http: HttpService,
        private readonly alertParamsService: AlertParamsService
    ) { }

    async processProtheusAlerts(input: ProtheusAlertDto | ProtheusAlertDto[]) {
        const alerts = Array.isArray(input) ? input : [input]; // garante array
        const results: any[] = [];

        for (const alert of alerts) {
            // 1) Descobre empresa_id pelo tenant
            const empresa = await this.prisma.empresa.findFirst({
                where: { tenant: alert.tenant },
                select: { id: true },
            });

            if (!empresa) {
                results.push({ tenant: alert.tenant, status: 'empresa_nao_encontrada' });
                continue;
            }

            // 2) Busca usuários com permissão 2 ou 3
            const usuarios = await this.prisma.usuario.findMany({
                where: {
                    empresaId: empresa.id,
                    permissaoId: { in: [2, 3] },
                },
                select: { email: true, celular: true },
            });

            if (!usuarios.length) {
                results.push({ tenant: alert.tenant, status: 'sem_usuarios' });
                continue;
            }

            // 3) Separa e-mails e celulares
            const emails: string[] = [];
            const telefones: string[] = [];
            for (const u of usuarios) {
                if (u.email) emails.push(u.email);
                if (u.celular) telefones.push(u.celular.replace(/\D/g, ''));
            }

            // 4) Define criticidade
            const status = this.getStatus(alert.percent_use);

            // 5) Monta mensagens
            const whatsText = this.buildWhatsText(alert, status);
            const htmlEmail = this.buildHtmlEmail(alert, status);

            // 6) Dispara
            await Promise.all(telefones.map(tel => this.sendWhats(tel, whatsText)));
            await Promise.all(emails.map(mail => this.email.sendEmail(mail, htmlEmail)));

            results.push({
                tenant: alert.tenant,
                enviados: emails.length + telefones.length,
                status,
            });
        }

        return { ok: true, results };
    }

    private getStatus(percent: number): 'ok' | 'warning' | 'critical' {
        if (percent >= 75) return 'critical';
        if (percent >= 60) return 'warning';
        return 'ok';
    }

    private buildWhatsText(alert: ProtheusAlertDto, status: string): string {
        const emoji = status === 'critical' ? '🚨' : status === 'warning' ? '⚠️' : 'ℹ️';
        return (
            `${emoji} ALERTA PROTHEUS ${emoji}\n` +
            `Usuário *${alert.user_so}* conectado no serviço *${alert.service_name}* ` +
            `executando a rotina *${alert.routine}*.\n` +
            `Consumo de memória: *${alert.percent_use}%*.\n` +
            `Uso atual: ${alert.memory_usage} MB de ${alert.memory_app} MB (App).\n` +
            `Servidor: ${alert.server_ip} (Total: ${alert.memory_server} MB).\n` +
            `Tenant: ${alert.tenant}\n` +
            `Hora: ${alert.timestamp}`
        );
    }

    private buildHtmlEmail(alert: ProtheusAlertDto, status: string): string {
        const color = status === 'critical' ? '#d9534f' : status === 'warning' ? '#f0ad4e' : '#5bc0de';
        return `
      <div style="font-family: Arial, sans-serif; font-size: 14px;">
        <h2 style="color:${color}">Alerta de Uso de Memória no Protheus</h2>
        <p>Usuário <b>${alert.user_so}</b> conectado no serviço <b>${alert.service_name}</b>
        executando a rotina <b>${alert.routine}</b>.</p>
        <p>Consumo: <b>${alert.percent_use}%</b></p>
        <p>Uso atual: ${alert.memory_usage} MB de ${alert.memory_app} MB (Aplicação)</p>
        <p>Servidor: ${alert.server_ip} (Total: ${alert.memory_server} MB)</p>
        <p>Tenant: ${alert.tenant}</p>
        <p>Hora: ${alert.timestamp}</p>
      </div>
    `;
    }

    // 👉 Aqui você pluga os métodos reais que já tem implementados
    private async sendWhats(number: string, message: string) {
        return this.alertParamsService.sendMessage({ number, message });
    }

    
}
