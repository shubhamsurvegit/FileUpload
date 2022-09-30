import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { AppService } from './app.service';
import { helper } from './helper';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  //single file
  @Post('/file')
  @UseInterceptors(FileInterceptor('file',helper))
  handleUpload(@UploadedFile() file:Express.Multer.File){
    return "file uploaded"
  }

  //multiple files
  @Post('files')
  @UseInterceptors(FilesInterceptor('files',2,{dest:'./uploads'}))
  handleUploads(@UploadedFiles() files:Array<Express.Multer.File>){
    return "file uploaded"
  }
  

  //download file
  @Get('get-image/:name')
  getImage(@Param('name') imagename:string ,@Res() res){
    try{
        return res.sendFile(join(process.cwd(),'uploads',imagename))
    }
    catch(err){
      return "File Not Found"
    }
  }

}
