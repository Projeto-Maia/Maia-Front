import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuizOption {
  id: string;
  text: string;
  redFlag: boolean;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Location {
  id: number;
  name: string;
  type: 'cop' | 'standard' | 'judge';
  address: string;
  phone: string;
  description: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly BASE_URL = 'https://maia-back.onrender.com';

  constructor(private http: HttpClient) {}

  getQuiz(): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.BASE_URL}/quiz`);
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.BASE_URL}/locations`);
  }
}
