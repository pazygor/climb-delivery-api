import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { EmailModule } from './email/email.module';
import { ProjectsModule } from './projects/projects.module';
import { ServersModule } from './servers/servers.module';
import { EmpresaModule } from './empresa/empresa.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { GroupUserModule } from './group-user/group-user.module';
import { GroupAlertModule } from './group-alert/group-alert.module';
import { InfraAlertModule } from './infra-alert/infra-alert.module';
import { AppAlertModule } from './app-alert/app-alert.module';

@Module({
  imports: [ContactsModule, WhatsappModule, EmailModule, ProjectsModule, ServersModule, EmpresaModule, CompanyModule, UserModule, GroupModule, GroupUserModule, GroupAlertModule, InfraAlertModule, AppAlertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
