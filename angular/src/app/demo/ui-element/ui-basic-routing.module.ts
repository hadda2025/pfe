import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/theme/layout/admin/navigation/role-guard/role-guard.component';

const routes: Routes = [
  {
    path: '',
    children: [
     
      
      {
        path: 'ajouter-agent',
   canActivate: [RoleGuard],
  data: { roles: ['admin'] },
        loadComponent: () => import('./ajouter-agent/ajouter-agent.component')
      },
      {
        path: 'update-agent/:id',
        loadComponent: () => import('./update-agent/update-agent.component')
      },
      {
        path: 'liste-agent',
        loadComponent: () => import('./liste-agent/liste-agent.component')
      },



       {
        path: 'profil',
        loadComponent: () => import('./profil/profil.component')
      },
        {
        path: 'reset-password',
        loadComponent: () => import('../pages/authentication/update-password/update-password.component')
      },

       {
        path: 'update-profil/:id',
        loadComponent: () => import('./update-profil/update-profil.component')
      },
        {
        path: 'update-user/:id',
        loadComponent: () => import('./update-user/update-user.component')
      },
      {
        path: 'change-password',
        loadComponent: () => import('./change-password/change-password.component')
      },
       
      {
        path: 'Ajouter-etudiant',
        loadComponent: () => import('./ajouter-etudiant/ajouter-etudiant.component')
      },
      {
        path: 'liste-etudiant',
         canActivate: [RoleGuard],
  data: { roles: ['Admin', 'Agent'] },
        loadComponent: () => import('./liste-etudiant/listetudiant.component')
      },
      {
        path: 'update-etudient/:id',
        loadComponent: () => import('./update-etudient/update-etudient.component')
      },




      {
        path: 'Ajouter-eseignant',
        loadComponent: () => import('./ajouter-enseignant/ajouter-enseignant.component')
      },
      {
        path: 'liste-enseignant',
         canActivate: [RoleGuard],
  data: { roles: ['Admin', 'Agent'] },
        loadComponent: () => import('./liste-enseignant/liste-enseignant.component')
      },
      {
        path: 'update-enseignant/:id',
        loadComponent: () => import('./update-enseignant/update-enseignant.component')
      },
       
      

      {
        path: 'ajouter-stage',
        loadComponent: () => import('./ajouter-stage/ajouter-stage.component')
      },
    
      {
        path: 'liste-stage',
         canActivate: [RoleGuard],
  data: { roles: ['Admin'] },
        loadComponent: () => import('./liste-stage/liste-stage.component')
      },

      {
        path: 'update-stage/:id',
        loadComponent: () => import('./update-stage/update-stage.component')
      },


      {
        path: 'Ajouter-session',
        loadComponent: () => import('./ajouter-session/ajouter-session.component')
      },
      {
        path: 'liste-sessions',
         canActivate: [RoleGuard],
  data: { roles: ['Admin', 'Agent'] },
        loadComponent: () => import('./liste-session/liste-session.component')
      },

      {
        path: 'update-session/:id',
        loadComponent: () => import('./update-session/update-session.component')
      },




      {
        path: 'Ajouter-salle',
        loadComponent: () => import('./ajouter-salle/ajouter-salle.component')
      },
      {
        path: 'liste-salles',
         canActivate: [RoleGuard],
  data: { roles: ['Admin', 'Agent'] },
        loadComponent: () => import('./liste-salle/liste-salle.component')
      },

      {
        path: 'update-salle/:id',
        loadComponent: () => import('./update-salle/update-salle.component')
      },







 {
        path: 'Ajouter-date',
        loadComponent: () => import('./ajouter-date/ajouter-date.component')
      },
      {
        path: 'liste-dates',
         canActivate: [RoleGuard],
  data: { roles: ['Admin', 'Agent'] },
        loadComponent: () => import('./liste-dates/liste-dates.component')
      },
        {
        path: 'update-date/:id',
        loadComponent: () => import('./update-date/update-date.component')
      },




       {
        path: 'Ajouter-seance',
        loadComponent: () => import('./ajouter-seance/ajouter-seance.component')
      },
      {
        path: 'liste-seance',
         canActivate: [RoleGuard],
  data: { roles: ['Admin', 'Agent'] },
        loadComponent: () => import('./liste-seance/liste-seance.component')
      },
        {
        path: 'update-seance/:id',
        loadComponent: () => import('./update-seance/update-seance.component')
      },



  {
        path: 'update-password/:id',
        loadComponent: () => import('../pages/authentication/update-password/update-password.component')
      },








     
      {
        path: 'planification-soutenance',
        loadComponent: () => import('./planification-soutenance/planification-soutenance.component')
      },
      {
        path: 'liste-soutenances',
         canActivate: [RoleGuard],
  data: { roles: ['Admin'] },
        loadComponent: () => import('./liste-soutenance/liste-soutenance.component')
      },
 {
        path: 'update-planification/:id',
        loadComponent: () => import('./update-planification/update-planification.component')
      },



         {
        path: 'Affectation-jury',
        loadComponent: () => import('./affectation-jury/affectation-jury.component')
      },

      {
        path: 'liste-Affectation-jury',
         canActivate: [RoleGuard],
  data: { roles: ['Admin'] },
        loadComponent: () => import('./liste-affectation-jury/liste-affectation-jury.component')
      },

  {
        path: 'update-jury/:id',
        loadComponent: () => import('./update-jury/update-jury.component')
      },




      {
        path: 'liste-soutenances',
        loadComponent: () => import('./liste-soutenance/liste-soutenance.component')
      },
     
      
      {
        path: 'pv/:id',
        loadComponent: () => import('./pv/pv.component')
      },

      {
        path: 'liste-enseignantbyrole',
        loadComponent: () => import('./liste-enseignantbyrole/liste-enseignantbyrole.component')
      },


      {
        path: 'liste-etudiantbysoutenance',
        loadComponent: () => import('./liste-etudiantbysoutenance/liste-etudiantbysoutenance.component')
      },
    {
        path: 'liste-soutenancebysalle',
        loadComponent: () => import('./listesoutenancebysalle/listesoutenancebysalle.component')
      },
    

      {
        path: 'ajouter-document',
        loadComponent: () => import('./ajouter-document/ajouter-document.component')
      },
      {
        path: 'liste-document',
        loadComponent: () => import('./liste-document/liste-document.component')
      },








      {
        path: 'badges',
        loadComponent: () => import('./badge/badge.component')
      },
      
     
      

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule {}
