import * as animations from './animations.js';
import * as navigation from './navigation.js';


$(document).ready(function(){
  console.log("HELLOW WORLD");
  navigation.init();
  animations.setUp();
  AOS.init();
});
