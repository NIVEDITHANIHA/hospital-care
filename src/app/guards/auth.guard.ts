import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthserviceService } from '../service/authservice.service';

export const authGuard: CanActivateFn = () => {
  const authStatus = inject(AuthserviceService)
  const router = inject(Router)

  if (authStatus.isLogged()) {
    return true;
  } else {
    Swal.fire({
      title: "info!",
      text: "please login",
      icon: "info"
    })
    router.navigateByUrl("")
    return false
  }
};
