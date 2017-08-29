import { OlMapObject } from '../portal-core-ui/service/openlayermap/ol-map-object';
import { RenderStatusService } from '../portal-core-ui/service/openlayermap/renderstatus/render-status.service';
import { Constants } from '../portal-core-ui/utility/constants.service';
import { AfterViewInit, Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { point, featureCollection, Geoms } from '@turf/helpers';
import olStyle from 'ol/style/style';
import olSource from 'ol/source/source';
import olFormat from 'ol/';
import olLayer from 'ol/layer/layer';
import olView from 'ol/view';
import olStroke from 'ol/style/stroke';
import olFill from 'ol/style/fill';
import olGeoJSON from 'ol/format/geojson';
import olSourceVector from 'ol/source/vector';
import olLayerVector from 'ol/layer/vector';


@Component({
    selector: 'app-ol-preview-map',
    template: `
    <div #previewMapElement style="display: block; height: 300px; width: 300px" > </div>
    `
    // The "#" (template reference variable) matters to access the map element with the ViewChild decorator!
})

export class OlMapPreviewComponent implements AfterViewInit {
    @ViewChild('previewMapElement') mapElement: ElementRef;
    iDiv: any = null;
    new_id: any = null;
    olMapObject: OlMapObject = null;

    /**
     * This constructor creates the preview map
     */
    constructor() {
      this.olMapObject = new OlMapObject(new RenderStatusService());
    }

    /**
     * Set the map target, refresh the map, disable map controls
     */
    ngAfterViewInit() {
        // After view init the map target can be set!
        const map = this.olMapObject.getMap();
        map.setTarget(this.mapElement.nativeElement);

        // Bootstrap tabs makes the map have a zero size when initialised
        // So we must force the map to display by changing its size
        const mapSize = map.getSize();
        if (mapSize[0] === 0) {
          map.setSize([300, 300]);
          // Remove controls
          const contrColl = map.getControls();
          for (let i = 0; i < contrColl.getLength(); i++) {
            map.removeControl(contrColl.item(i));
          }
          // Disable pan and zoom via keyboard & mouse
          const actionColl = map.getInteractions();
          for (let i = 0; i < actionColl.getLength(); i++) {
            const action = actionColl.item(i);
            action.setActive(false);
          }
        }
    }

    /**
    * Adds bounding boxes to the preview map, recentres the map to the middle of the bounding boxes
    * @param reCentrePt  Point to re-centre map
    * @param bboxGeojsonObject  Bounding boxes in GeoJSON format
    */
    setupBBoxes(reCentrePt: [number, number], bboxGeojsonObject: GeoJSON.FeatureCollection<Geoms>) {
        // Set up bounding box style
        const rectStyle = new olStyle({
            stroke: new olStroke({
            color: 'black',
            width: 2
          }),
          fill: new olFill({
            color: 'rgba(128, 128, 128, 0.25)'
          })
        });
        const source = new olSourceVector({
          features: (new olGeoJSON()).readFeatures(bboxGeojsonObject)
        });
        const vectorLayer = new olLayerVector({
          source: source,
          style: [rectStyle]
        });
        // Add bounding boxes
        this.olMapObject.getMap().addLayer(vectorLayer);
        let newView;
        // Only re-centre and zoom using valid coordinates, otherwise just recentre to middle of Australia
        if (isNaN(reCentrePt[0]) || isNaN(reCentrePt[1])) {
          newView = new olView({center: Constants.CENTRE_COORD, zoom: 3});
        } else {
          newView = new olView({center: reCentrePt, zoom: 3});
        }
        this.olMapObject.getMap().setView(newView);
    }

}