export default [{
    path: '/projects/blurryloading',
    name: 'BlurryLoading',
    component: () => import('../src/components/projects/BlurryLoading.vue'),
  },{
    path: '/projects/fancycards',
    name: 'FancyCards',
    component: () => import('../src/components/projects/FancyCards.vue'),
  },{
    path: '/projects/rainbowbutton',
    name: 'RainbowButton',
    component: () => import('../src/components/projects/RainbowButton.vue'),
  }
]