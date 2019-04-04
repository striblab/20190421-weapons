/**
 * Main JS file for project.
 */

/**
 * Define globals that are added through the js.globals in
 * the config.json file, here, mostly so linting won't get triggered
 * and its a good queue of what is available:
 */
// /* global $, _ */

// Dependencies
import utils from './shared/utils.js';

// Mark page with note about development or staging
utils.environmentNoting();


// Auto enable Pym for embedding.  This will enable a Pym Child if
// the url contains ?pym=true
utils.autoEnablePym();


/**
 * Adding dependencies
 * ---------------------------------
 * Import local ES6 or CommonJS modules like this:
 * import utilsFn from './shared/utils.js';
 *
 * Or import libraries installed with npm like this:
 * import module from 'module';
 */


/**
 * Adding Svelte templates in the client
 * ---------------------------------
 * We can bring in the same Svelte templates that we use
 * to render the HTML into the client for interactivity.  The key
 * part is that we need to have similar data.
 *
 * First, import the template.  This is the main one, and will
 * include any other templates used in the project.
 *
 *   `import Content from '../templates/_index-content.svelte.html';`
 *
 * Get the data parts that are needed.  There are two ways to do this.
 * If you are using the buildData function to get data, then add make
 * sure the config for your data has a `local: "content.json"` property
 *
 *  1. For smaller datasets, just import them like other files.
 *     `import content from '../assets/data/content.json';`
 *  2. For larger data points, utilize window.fetch.
 *     `let content = await (await window.fetch('../assets/data/content.json')).json();`
 *
 * Once you have your data, use it like a Svelte component:
 *
 * const app = new Content({
 *  target: document.querySelector('.article-lcd-body-content'),
 *  hydrate: true,
 *  data: {
 *    content
 *  }
 * });
 */



// Common code to get svelte template loaded on the client.  Probably need data.
//
// import Content from '../templates/_index-content.svelte.html
//
// const app = new Content({
//   target: document.querySelector('.article-lcd-body-content'),
//   hydrate: true,
//   data: {
//   }
// });


//chart selection parameters
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    } else {
        return null;
    }
}

var selected = $.urlParam('chart');

if (selected != null) {
    $(".slide").hide();
    $("#" + selected).show();
}
if (selected == "all") {
    $(".slide").show();
}

import Chart from './chart.js';

import mpls from '../sources/minneapolis_nb.json';
import weapons from '../sources/weapons.json';
import hex from '../sources/hex.json';

const chart1 = new Chart('#chartTrend');

chart1.render();

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA';

var dzoom = 10.5;
var mzoom = 10.5;
var center = [-93.265015, 44.977753];

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/shadowflare/ciqzo0bu20004bknkbrhrm6wf',
    // center: [-93.264313, 44.973269],
    center: center,
    zoom: dzoom,
    minZoom: mzoom
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();
map.doubleClickZoom.disable();

                
map.on('load', function() {

    // map.addSource('nb', {
    //     type: 'geojson',
    //     data: '../sources/hex.json'
    //   });
     
    //    map.addLayer({
    //         'id': 'nb-layer',
    //         'interactive': true,
    //         'source': 'nb',
    //         'layout': {},
    //         'type': 'fill',
    //              'paint': {
    //             'fill-antialias' : true,
    //             'fill-opacity': 0.7,
    //             'fill-color': {
    //              "property": "NUMPOINTS",
    //              "stops": [
    //                [0, "rgba(255, 255, 255, 0)"],
    //                [1, "rgba(247, 251, 255, 0.5)"],
    //                [50, "#D1E6E1"],
    //                [75, "#A7E6E3"],
    //                [100, "#67B4C2"],
    //                [500, "#3580A3"],
    //                [1000, "#0D4673"]
    //             ]
    //          },
    //             'fill-outline-color': {
    //              "property": "NUMPOINTS",
    //              "stops": [
    //                [0, "rgba(255, 255, 255, 0)"],
    //                [1, "#888888"],
    //                [20, "#888888"],
    //                [40, "#888888"],
    //                [60, "#888888"],
    //                [80, "#888888"],
    //                [100, "#888888"]
    //             ]
    //          }
    //       }
    //     }, 'road-primary');

    map.addSource('nb2', {
        type: 'geojson',
        data: mpls
    });

    map.addLayer({
        'id': 'nb2-layer',
        'interactive': true,
        'source': 'nb2',
        'layout': {},
        'type': 'fill',
        'paint': {
            'fill-antialias': true,
            'fill-opacity': 0.7,
            'fill-color': 'rgba(255, 255, 255, 0)',
            'fill-outline-color': 'rgba(0, 0, 0, 1)'
        }
    }, 'road-primary');

    map.addSource('weapons', {
        type: 'geojson',
        data: hex
      });
  
    //   map.addLayer({
    //     "id": "weapons-layer",
    //     "type": "circle",
    //     "source": "weapons",
    //     "paint": {
    //       "circle-radius": 5,
    //       "circle-color": '#3580A3',
    //       "circle-opacity": 0.3
    //     },
    //   }, 'place-neighbourhood');

    map.addLayer({
        'id': 'weapons-layer',
        'interactive': true,
        'source': 'weapons',
        'layout': {},
        'type': 'fill',
             'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color': {
             "property": "NUMPOINTS",
             "stops": [
               [0, "rgba(255, 255, 255, 0)"],
               [1, "rgba(247, 251, 255, 0.5)"],
               [5, "#D1E6E1"],
               [10, "#A7E6E3"],
               [15, "#67B4C2"],
               [20, "#3580A3"],
               [25, "#0D4673"]
            ]
         },
            'fill-outline-color': {
             "property": "NUMPOINTS",
             "stops": [
               [0, "rgba(255, 255, 255, 0)"],
               [1, "#888888"],
               [5, "#888888"],
               [10, "#888888"],
               [15, "#888888"],
               [20, "#888888"],
               [25, "#888888"]
            ]
         }
      }
    }, 'road-primary');

});

$(document).ready(function() {
    if ($("#wrapper").width() < 600) {
        map.flyTo({
            center: center,
            zoom: mzoom,
        });
    } else {
        map.flyTo({
            center: center,
            zoom: dzoom,
        });
    }
    $(window).resize(function() {
        if ($("#wrapper").width() < 600) {
            map.flyTo({
                center: center,
                zoom: mzoom,
            });
        } else {
            map.flyTo({
                center: center,
                zoom: dzoom,
            });
        }
    });
});