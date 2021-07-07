import { readdir, writeFile, mkdir, exists, readFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import * as vscode from 'vscode';
const indexFileName = 'index';
const indexFileExt = '.ts';

const prefabName = 'prefab';
const prefabExtention = '.prefab';

const descFileName = 'desc';
const descFileExt = '.json';
const folderName = ['res', 'script', 'anim', 'prefab'];

export function genIndex(dir: string) {
  let disposable=vscode.window.showInputBox({ prompt: `输入组件名称` }).then(function(msg){
    if (!msg) {
      exports.logger("error", `组件名称不能为空!`);
      throw new Error(`组件名称不能为空!`);
    } else {
      mkdir(dir + '/' + msg, function (err) {
        if (err) {
          vscode.window.showInformationMessage('文件夹:'+msg+'创建失败！');
          throw err;
        }
      });
      // 得到目录下所有文件名集合
      const result =  promisify(readdir)(dir);
      // 创建 目录
      for (let i = 0; i < folderName.length; i++) {
        mkdir(dir +'/' + msg+'/' + folderName[i], function (err) {
          if (err) {
            vscode.window.showInformationMessage('文件夹:'+folderName[i]+'创建失败！');
            throw err;
          }
        });
      }

      readFile(join(__dirname, 'prefab.prefab'), function (err, data) {
        if (err) {
          vscode.window.showInformationMessage(msg + prefabExtention+'创建失败！');
          throw err;
        }
        promisify(writeFile)(join(dir +'/' + msg+ '/prefab', msg + prefabExtention), data);
  
      });
  
      readFile(join(__dirname, 'NewScript.txt'), 'utf-8', function (err, data) {
        if (err) {
          vscode.window.showInformationMessage( msg + indexFileExt+'创建失败！');
          throw err;
        }
        data = data.replace(/__template__/g, msg.toString());
        promisify(writeFile)(join(dir +'/' + msg+ '/script', msg + indexFileExt), data);
  
      });
  
      readFile(join(__dirname, 'desc.json'), 'utf-8', function (err, data) {
        if (err) {
          vscode.window.showInformationMessage( descFileName + descFileExt+'创建失败！');
          throw err;
        }
        data = data.replace(/__template__/g, msg.toString());
        promisify(writeFile)(join(dir +'/' + msg+ '/', descFileName + descFileExt), data);
  
      });
  
  
    }
});;
  



}