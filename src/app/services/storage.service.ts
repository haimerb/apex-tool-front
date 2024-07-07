import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const STATE_KEY = 'state';
const STATE_SHOW_KEY='show-loader';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    //console.log(user);
    if (user&&user!=null) {
      return true;
    }

    return false;
  }

  public statePrincipal(): string {
    const state = window.sessionStorage.getItem(STATE_KEY);
    if(state){
      return state;
    }
    return "";
  }

public setStatePrincipal(state :any):void{
  window.sessionStorage.setItem(STATE_KEY, state);
}


public stateShowLoader(): string {
  const state = window.sessionStorage.getItem(STATE_SHOW_KEY);
  if(state){
    return state;
  }
  return "";
}


public setStateShowLoader(state :any):void{
  window.sessionStorage.setItem(STATE_SHOW_KEY, state);
}


}
