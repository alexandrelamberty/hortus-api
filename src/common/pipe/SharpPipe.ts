import { Injectable, Logger, PipeTransform } from "@nestjs/common";
import * as path from "path";
import * as sharp from "sharp";

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    if (image) {
      // const originalName = path.parse(image.originalname).name;
      const filename = Date.now() + ".webp";
      await sharp(image.buffer)
        .resize(800, 800)
        .webp({ effort: 3 })
        .toFile(path.join("./upload", filename), function (err, info) {
          new Logger(SharpPipe.name).log(err, info);
        });

      return filename;
    }
  }
}
