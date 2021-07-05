import { readdir, writeFile ,mkdir,exists,readFile} from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import * as vscode from 'vscode';
const indexFileName = 'index'
const indexFileExt = '.ts'

const prefabName = 'prefab'
const prefabExtention = '.meta'

const descFileName = 'desc'
const descFileExt = '.json'

const folderName = ['res','script','anim','prefab']


export async function genIndex(dir: string) {
  // 得到目录下所有文件名集合
  const result = await promisify(readdir)(dir)

  // 创建 newdir 目录
  for(let i=0;i<folderName.length;i++){
    mkdir(dir+'/'+folderName[i], function(err) {
        if (err) {
            throw err;
        }
    });
  }
//   promisify(writeFile)(join(dir+'/script', indexFileName + indexFileExt), '')

  readFile(join(__dirname,'prefab.meta'), function(err, data) {
    // console.log(data);
    // 读取文件失败/错误
    let fileName=dir.split('\\')[dir.split('\\').length-1]
    if (err) {
        throw err;
    }
    promisify(writeFile)(join(dir+'/prefab', fileName + prefabExtention),data)
   
});

readFile(join(__dirname,'NewScript.txt'), 'utf-8',function(err, data) {
    // 读取文件失败/错误
    if (err) {
        throw err;
    }
    let fileName=dir.split('\\')[dir.split('\\').length-1]
    data=data.replace(/__template__/g,fileName)
    // 读取文件成功
    promisify(writeFile)(join(dir+'/script', fileName + indexFileExt),data)
   
});

readFile(join(__dirname,'desc.json'), 'utf-8', function(err, data) {
  
  // 读取文件失败/错误
  if (err) {
      throw err;
  }
  let fileName=dir.split('\\')[dir.split('\\').length-1]
  data=data.replace(/__template__/g,fileName)
  // 读取文件成功
  promisify(writeFile)(join(dir+'/', descFileName + descFileExt),data)

});
  
}