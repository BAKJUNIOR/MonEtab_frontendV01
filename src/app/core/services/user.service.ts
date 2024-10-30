import { Injectable} from '@angular/core';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private localService: LocalStorageService) {}
  isAuthenticated(): boolean{
    let token: string | null = this.localService.getToken();
    if (token == null){
      return false
    }
    return true;
  }
}

