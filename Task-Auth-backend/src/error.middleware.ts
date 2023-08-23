import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class GlobalErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        let errorMessage = err.message || "Something went wrong";

        // // Customize error message based on the specific exception
        // if (err instanceof YourCustomException) {
        //   errorMessage = "Custom error message for YourCustomException";
        // }

        console.error("An error occurred:", err);

        return throwError(new BadGatewayException(errorMessage));
      })
    );
  }
}
