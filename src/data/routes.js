export default [{
    path: '/projects/blurryloading',
    name: 'BlurryLoading',
    component: () => import('../components/projects/BlurryLoading.vue'),
  },{
    path: '/projects/fancycards',
    name: 'FancyCards',
    component: () => import('../components/projects/FancyCards.vue'),
  },{
    path: '/projects/rainbowbutton',
    name: 'RainbowButton',
    component: () => import('../components/projects/RainbowButton.vue'),
  }
]