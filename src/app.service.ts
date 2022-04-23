import { Injectable } from '@nestjs/common';
import { responseData, responseError } from './dto/app.dto';
import { createFile, getFile } from './helpers/storage.helper';

@Injectable()
export class AppService {
  private readonly link = 'https://jadinikah.ink/windanasa/?to=';
  private readonly apiWA = 'https://api.whatsapp.com/send?phone=';

  getHello() {
    return responseData('hello word', 'success');
  }

  getHello2() {
    return responseData('hello word 2', 'success');
  }

  async generateLink(path = 'list-nama.txt', templateMessage = 'template.txt') {
    try {
      const getPath = await getFile(path);
      const data = getPath.toString();
      const splitList = data.split('\n');
      const names = splitList.map((item) => item.split('/')[0]);
      const noHP = splitList.map((item) => item.split('/')[1]);
      const linkInvitation = data.split('\n').map((item) => {
        const split = item.split('/');
        const convertLink = `${this.link}${split[0].split(' ').join('+')}`;
        return convertLink;
      });

      const getTemplate = await getFile(templateMessage);
      const templateReplace = [];
      let index = 0;
      for (const item of names) {
        let newTemplate = getTemplate.toString();
        newTemplate = newTemplate.replace('{{name}}', item);
        newTemplate = newTemplate.replace('{{link}}', linkInvitation[index]);
        const linkWA = `${index + 1}. ${item} - ${this.apiWA}${noHP[index]}&text=${encodeURIComponent(newTemplate)}`;
        templateReplace.push(linkWA);
        index++;
      }

      const value = templateReplace.join('\n\n');
      await createFile('output', 'result-link.txt', value);
      return responseData(value, 'success');
    } catch (error) {
      console.log(error);
    }
  }

  async generatLinkWA(data = [], templateMessage = 'template.txt') {
    try {
      if (!data?.length) {
        return responseData(null, 'success');
      }

      const names = data.map((item) => item?.name);
      const ids = data.map((item) => item?.id);
      const noHP = data.map((item) => item?.phone);
      const linkInvitation = data.map((item) => {
        const convertLink = `${this.link}${item?.name.split(' ').join('+')}`;
        return convertLink;
      });

      console.log(__dirname + '/' + templateMessage);
      const getTemplate = await getFile(__dirname + '/' + templateMessage);
      const result = [];
      let index = 0;
      for (const item of names) {
        let newTemplate = getTemplate.toString();
        newTemplate = newTemplate.replace('{{name}}', item);
        newTemplate = newTemplate.replace('{{link}}', linkInvitation[index]);
        const linkWA = `${this.apiWA}${noHP[index]}&text=${encodeURIComponent(newTemplate)}`;
        result.push({
          id: ids[index],
          name: item,
          phone: noHP[index],
          linkWA,
          content: encodeURIComponent(newTemplate)
        });
        index++;
      }

      return responseData(result, 'success');
    } catch (error) {
      return responseError(error);
    }
  }
}
