import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  Map as LeafletMap,
  latLng,
  tileLayer,
  marker,
  icon,
  Marker,
  LatLngBounds,
} from 'leaflet';
import * as L from 'leaflet';

import { ApiService, Location } from '../../../core/services/api.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnInit, AfterViewInit {
  @ViewChild('leafletContainer', { static: true }) leafletContainer!: ElementRef;

  leafletMap!: LeafletMap;
  allMarkers: Marker[] = [];
  locations: Location[] = [];
  total = 0;
  discoveredIds = new Set<number>();

  get discovered() {
    return this.discoveredIds.size;
  }

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getLocations().subscribe((locs) => {
      this.locations = locs;
      this.total = locs.length;

      const bounds = new LatLngBounds([]);

      this.allMarkers = locs.map((loc) => {
        const m = marker([loc.latitude, loc.longitude], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: this.chooseIcon(loc.type),
            shadowUrl:
              'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          }),
        }).bindPopup(`<strong>${loc.name}</strong><br>${loc.address}<br><small>${loc.description}</small>`)


        bounds.extend(m.getLatLng());
        return m;
      });

      setTimeout(() => {
        if (this.leafletMap) {
          this.allMarkers.forEach((mk) => mk.addTo(this.leafletMap));
          this.leafletMap.fitBounds(bounds, { padding: [20, 20] });
        }
      }, 200); // dá tempo do mapa ter dimensão certa
    });
  }

  ngAfterViewInit(): void {
    this.leafletMap = L.map(this.leafletContainer.nativeElement, {
      center: latLng(-15.78, -47.93),
      zoom: 12,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      touchZoom: false,
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }),
      ],
    });

    setTimeout(() => {
      this.leafletMap.invalidateSize();
    }, 200);
  }

  chooseIcon(type: Location['type']): string {
    const icons: Record<string, string> = {
      cop:
        'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-blue.png',
      standard:
        'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png',
      judge:
        'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-violet.png',
    };
    return icons[type];
  }

  focusLocation(loc: Location) {
    if (!this.leafletMap) return;

    this.leafletMap.flyTo([loc.latitude, loc.longitude], 16, { duration: 1 });
    this.discoveredIds.add(loc.id);
    const mk = this.allMarkers.find((m) =>
      m.getLatLng().equals(latLng(loc.latitude, loc.longitude))
    );
    mk?.openPopup();
  }

  resetMap() {
    if (!this.leafletMap) return;

    this.leafletMap.setView(latLng(-15.78, -47.93), 12);
    this.allMarkers.forEach((mk) => mk.closePopup());
  }
}