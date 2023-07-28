import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { EmailVerifiedGuard } from './guards/email-verified.guard';

const routes: Routes = [
  
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule),
    
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sesiones',
    loadChildren: () => import('./pages/sesiones/sesiones.module').then( m => m.SesionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then( m => m.WalletPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agrega-tarjeta',
    loadChildren: () => import('./pages/agrega-tarjeta/agrega-tarjeta.module').then( m => m.AgregaTarjetaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'califica-llamada',
    loadChildren: () => import('./pages/califica-llamada/califica-llamada.module').then( m => m.CalificaLlamadaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sessiones',
    loadChildren: () => import('./pages/sessiones/sessiones.module').then( m => m.SessionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then( m => m.RecordsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'call-detail/:id',
    loadChildren: () => import('./pages/call-detail/call-detail.module').then( m => m.CallDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'calls',
    loadChildren: () => import('./pages/calls/calls.module').then( m => m.CallsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'commissions',
    loadChildren: () => import('./pages/commissions/commissions.module').then( m => m.CommissionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'commissions-calls',
    loadChildren: () => import('./pages/commissions-calls/commissions-calls.module').then( m => m.CommissionsCallsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'commissions-referrals',
    loadChildren: () => import('./pages/commissions-referrals/commissions-referrals.module').then( m => m.CommissionsReferralsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-options',
    loadChildren: () => import('./pages/perfil-options/perfil-options.module').then( m => m.PerfilOptionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-bank',
    loadChildren: () => import('./pages/perfil-bank/perfil-bank.module').then( m => m.PerfilBankPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-password',
    loadChildren: () => import('./pages/perfil-password/perfil-password.module').then( m => m.PerfilPasswordPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-suspend',
    loadChildren: () => import('./pages/perfil-suspend/perfil-suspend.module').then( m => m.PerfilSuspendPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-delete',
    loadChildren: () => import('./pages/perfil-delete/perfil-delete.module').then( m => m.PerfilDeletePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle-llamada/:id',
    loadChildren: () => import('./pages/detalle-llamada/detalle-llamada.module').then( m => m.DetalleLlamadaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet-pagos',
    loadChildren: () => import('./pages/wallet-pagos/wallet-pagos.module').then( m => m.WalletPagosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet-tarjetas',
    loadChildren: () => import('./pages/wallet-tarjetas/wallet-tarjetas.module').then( m => m.WalletTarjetasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'plans',
    loadChildren: () => import('./pages/plans/plans.module').then( m => m.PlansPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'referral-detail/:id',
    loadChildren: () => import('./pages/referral-detail/referral-detail.module').then( m => m.ReferralDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agrega-plan',
    loadChildren: () => import('./pages/agrega-plan/agrega-plan.module').then( m => m.AgregaPlanPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agrega-plan-modal',
    loadChildren: () => import('./pages/agrega-plan-modal/agrega-plan-modal.module').then( m => m.AgregaPlanModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ayuda-factura',
    loadChildren: () => import('./pages/ayuda-factura/ayuda-factura.module').then( m => m.AyudaFacturaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ayuda-soporte',
    loadChildren: () => import('./pages/ayuda-soporte/ayuda-soporte.module').then( m => m.AyudaSoportePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-plans',
    loadChildren: () => import('./pages/add-plans/add-plans.module').then( m => m.AddPlansPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'call-rate',
    loadChildren: () => import('./pages/call-rate/call-rate.module').then( m => m.CallRatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'plan-edit',
    loadChildren: () => import('./pages/plan-edit/plan-edit.module').then( m => m.PlanEditPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bank-edit',
    loadChildren: () => import('./pages/bank-edit/bank-edit.module').then( m => m.BankEditPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'acount-link',
    loadChildren: () => import('./pages/acount-link/acount-link.module').then( m => m.AcountLinkPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'acount-error',
    loadChildren: () => import('./pages/acount-error/acount-error.module').then( m => m.AcountErrorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro-plan',
    loadChildren: () => import('./pages/registro-plan/registro-plan.module').then( m => m.RegistroPlanPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'acount-conect',
    loadChildren: () => import('./pages/acount-conect/acount-conect.module').then( m => m.AcountConectPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cambiar-tel',
    loadChildren: () => import('./pages/cambiar-tel/cambiar-tel.module').then( m => m.CambiarTelPageModule)
  },
  {
    path: 'registro-speaker',
    loadChildren: () => import('./pages/registro-speaker/registro-speaker.module').then( m => m.RegistroSpeakerPageModule)
  },
  {
    path: 'registro-improver',
    loadChildren: () => import('./pages/registro-improver/registro-improver.module').then( m => m.RegistroImproverPageModule)
  },
  {
    path: 'call-rate-improver',
    loadChildren: () => import('./pages/call-rate-improver/call-rate-improver.module').then( m => m.CallRateImproverPageModule)
  },  {
    path: 'add-plan103',
    loadChildren: () => import('./pages/add-plan103/add-plan103.module').then( m => m.AddPlan103PageModule)
  },
  {
    path: 'add-planplus',
    loadChildren: () => import('./pages/add-planplus/add-planplus.module').then( m => m.AddPlanplusPageModule)
  },
  {
    path: 'upgrade-plan',
    loadChildren: () => import('./pages/upgrade-plan/upgrade-plan.module').then( m => m.UpgradePlanPageModule)
  },

















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
