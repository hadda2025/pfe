export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
   roles?: string[]; // ← Champ ajouté ici
}

export const NavigationItems: NavigationItem[] = [
 
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/analytics',
        icon: 'feather icon-home'
      },

   
    
  

     
      
  

  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    roles: ['Admin'],
    children: [
      {
        id: 'basic',
        title: 'Gestion-Agent',
        type: 'collapse',
        icon: 'feather icon-briefcase',
        roles: ['Admin'],
        children: [
          {
            id: 'ajouter-agent',
            title: 'Ajouter Agent',
            type: 'item',
            url: '/component/ajouter-agent',
              roles: ['Admin']
          },
        
          {
            id: 'liste-agent',
            title: 'Liste Agents',
            type: 'item',
            url: '/component/liste-agent',
              roles: ['Admin'],
          }
        ]
      }
    ]
  },
  

  

{
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion-Etudiant',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'Ajouter-etudiant',
            title: 'Ajouter Étudiant',
            type: 'item',
            url: '/component/Ajouter-etudiant'
          },
          {
            id: 'liste-etudiant',
            title: 'Liste Étudiants',
            type: 'item',
            url: '/component/liste-etudiant',
            
          }
        ]
      }
    ]
  },



  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion-Enseignant',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'Ajouter-eseignant',
            title: 'Ajouter Enseignant',
            type: 'item',
            url: '/component/Ajouter-eseignant'
          },
          {
            id: 'liste-enseignant',
            title: 'Liste Enseignants',
            type: 'item',
            url: '/component/liste-enseignant'
          }, 
        ]
      }
    ]
  },


  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion-Sujets',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [

          {
            id: 'ajouter-stage',
            title: 'Ajouter sujet',
            type: 'item',
            url: '/component/ajouter-stage'
          },
          {
            id: 'liste-stage',
            title: 'liste-sujets',
            type: 'item',
            url: '/component/liste-stage'
          },
   
        ]
      }
    ]
  },
{
id: 'ui-component',
title: '',
type: 'group',
icon: 'icon-group',
children: [
  {
  id: 'basic',
  title: 'Gestion-Jurys',
  type: 'collapse',
  icon: 'feather icon-users',
  children: [
      {
      id: 'Affectation-jury',
      title: 'Affectation-jury',
      type: 'item',
      url: '/component/Affectation-jury'
    },
  
 {
      id: 'liste-Affectation-jury',
      title: 'liste-Affectation-jury',
      type: 'item',
      url: '/component/liste-Affectation-jury'
    },  
  ]
}
]
},

  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion-Sessions',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
        id: 'Ajouter-session',
        title: 'Ajouter-session',
        type: 'item',
        url: '/component/Ajouter-session'
      },
      {
        id: 'liste-sessions',
        title: 'liste-sessions',
        type: 'item',
        url: '/component/liste-sessions'
      },
   
    ]
  }
]
},


{
id: 'ui-component',
title: '',
type: 'group',
icon: 'icon-group',
children: [
  {
  id: 'basic',
  title: 'Gestion-Salles',
  type: 'collapse',
  icon: 'feather icon-users',
  children: [
    {
      id: 'Ajouter-salle',
      title: 'Ajouter-salle',
      type: 'item',
      url: '/component/Ajouter-salle'
    },
    {
      id: 'liste-salles',
      title: 'liste-salles',
      type: 'item',
      url: '/component/liste-salles'
    },
   
  ]
}
]
},



{
id: 'ui-component',
title: '',
type: 'group',
icon: 'icon-group',
children: [
  {
  id: 'basic',
  title: 'Gestion-dates',
  type: 'collapse',
  icon: 'feather icon-users',
  children: [
    {
      id: 'Ajouter-date',
      title: 'Ajouter-date',
      type: 'item',
      url: '/component/Ajouter-date'
    },
    {
      id: 'liste-dates',
      title: 'liste-dates',
      type: 'item',
      url: '/component/liste-dates'
    },
   
  ]
}
]
},


{
id: 'ui-component',
title: '',
type: 'group',
icon: 'icon-group',
children: [
  {
  id: 'basic',
  title: 'Gestion-seances',
  type: 'collapse',
  icon: 'feather icon-users',
  children: [
    {
      id: 'Ajouter-seance',
      title: 'Ajouter-seance',
      type: 'item',
      url: '/component/Ajouter-seance'
    },
    {
      id: 'liste-seance',
      title: 'liste-seances',
      type: 'item',
      url: '/component/liste-seance'
    },
   
  ]
}
]
},







{
id: 'ui-component',
title: '',
type: 'group',
icon: 'icon-group',
children: [
{
  id: 'basic',
  title: 'Gestion-Soutenances',
  type: 'collapse',
  icon: 'feather icon-users',
  children: [
    
  

    {
      id: 'planification-soutenance',
      title: 'planification-soutenance',
      type: 'item',
      url: '/component/planification-soutenance'
    },
    {
      id: 'liste-soutenances',
      title: 'liste-soutenances planifiées',
      type: 'item',
      url: '/component/liste-soutenances'
    },

  ]
}
]
},


{
id: 'ui-component',
title: '',
type: 'group',
icon: 'icon-group',
children: [
{
  id: 'basic',
  title: 'Plunning',
  type: 'collapse',
  icon: 'feather icon-users',
  children: [
    {
      id: 'liste-enseignantbyrole',
      title: 'Plunnig par enseignant',
      type: 'item',
      url: '/component/liste-enseignantbyrole'
    },

    
 {
      id: 'liste-soutenancebysalle',
      title: 'Plunnig par salle',
      type: 'item',
      url: '/component/liste-soutenancebysalle'
    },

    {
      id: 'liste-etudiantbysoutenance',
      title: 'Plunnig par etudiant',
      type: 'item',
      url: '/component/liste-etudiantbysoutenance'
    },
    


  ]
}
]
},




{
id: 'ui-component',
title: '',
type: 'group',
icon: 'icon-group',
children: [
{
  id: 'basic',
  title: 'Gestion-Documents',
  type: 'collapse',
  icon: 'feather icon-users',
  children: [
    {
      id: 'ajouter-document',
      title: 'Ajouter-document',
      type: 'item',
      url: '/component/ajouter-document'
    },
    {
      id: 'liste-document',
      title: 'liste-document',
      type: 'item',
      url: '/component/liste-document'
    },
   
  ]
}
]
},

]