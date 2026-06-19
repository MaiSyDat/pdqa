/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Theme = 'light' | 'dark';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface AlbumPhoto {
  id: string;
  url: string;
  title: string;
  caption?: string;
  date?: string;
}

export interface Message {
  id: string;
  sender: 'dat' | 'quynh_anh' | 'system_date' | 'system_call_started' | 'system_call_ended' | 'shared_post' | 'attachment' | 'quynh_anh_gap' | 'dat_gap' | 'system_date_gap' | 'quynh_anh_blank' | 'dat_blank';
  text: string;
  time?: string;
}
