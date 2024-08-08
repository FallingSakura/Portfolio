export default [{
    path: '/projects/blurryloading',
    name: 'BlurryLoading',
    component: () => import('../components/projects/BlurryLoading.vue'),
  },{
    path: '/projects/expandingcards',
    name: 'ExpandingCards',
    component: () => import('../components/projects/ExpandingCards.vue'),
  },{
    path: '/projects/fancycards',
    name: 'FancyCards',
    component: () => import('../components/projects/FancyCards.vue'),
  },{
    path: '/projects/rainbowbutton',
    name: 'RainbowButton',
    component: () => import('../components/projects/RainbowButton.vue'),
  },{
    path: '/projects/scheduleform',
    name: 'ScheduleForm',
    component: () => import('../components/projects/ScheduleForm.vue'),
  },{
    path: '/projects/waveform',
    name: 'WaveForm',
    component: () => import('../components/projects/WaveForm.vue'),
  }
]