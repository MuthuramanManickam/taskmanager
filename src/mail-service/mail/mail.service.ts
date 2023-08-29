import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailOptions } from 'src/interface/register.interface';

@Injectable()
export class MailService {
    constructor(private mailService : MailerService) {}

    async sendMail(mailOptions : IMailOptions) {
        return new Promise(async(resolve, reject) => { 
            await this.mailService.sendMail({
                to: mailOptions.mail,
                from: 'Admin <admin@gmail.com>',
                subject: mailOptions.subject,
                template: mailOptions.template,
                context: {
                    data : mailOptions,
                }
            })
            .then(() => {
                console.log('Mail sent successfully');
                resolve(true);
            })
            .catch((err) => {
                console.log('Error in sending mail',err.stack);
                reject(false);
            });
        })
    }
}
