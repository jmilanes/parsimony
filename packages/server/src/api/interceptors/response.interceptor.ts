import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TransformIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.transformIds(data)));
  }

  private transformIds(data: any): any {
    // Check if the data is an array or a single object
    if (Array.isArray(data)) {
      return data.map((item) => this.transformObjectIds(item));
    } else {
      return this.transformObjectIds(data);
    }
  }

  private transformObjectIds(obj: any): any {
    const doc = obj?._doc || obj;
    if (!!doc?._id) {
      doc.id = doc._id;
      delete doc._id;
    }
    return doc;
  }
}
