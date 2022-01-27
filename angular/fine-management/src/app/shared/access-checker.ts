import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable()
export class AccessChecker {
    
    constructor(private router : Router ) {

    }

    preventUnauthorizedAccess()
    {
        if (!localStorage.getItem('user')) 
            this.router.navigate(['/']);
    }
}
