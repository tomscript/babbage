import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface IPlugin {
  description: string;
  options: any[];
  optionsDesc: any[];
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public opened = false;
  public title = 'Babbage';
  public plugins: IPlugin[] = [];
  public selectedPlugins: IPlugin[] = [];
  public model = { input: '', output: '' };
  public backend: string = environment.production
    ? 'https://backend-dot-babbage-stable.appspot.com/'
    : 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.opened = true;
    const url = this.backend + `/listplugins`;
    this.http.get(url).subscribe((results) => {
      this.plugins = results as any;
    });
  }

  add(plugin: IPlugin) {
    const newObj = { ...plugin };
    this.selectedPlugins.push(newObj);
    const ops = [];
    for (let i = 0; i < plugin.options.length; i++) {
      ops.push('');
    }
    plugin.options = ops;
  }

  remove(plugin: IPlugin) {
    this.selectedPlugins.splice(this.selectedPlugins.indexOf(plugin), 1);
  }

  async convert() {
    const url = this.backend + '/convert';
    const values = {
      input: this.model.input,
      plugins: this.selectedPlugins,
    };
    this.http.post(url, values).subscribe((results: any) => {
      if (results.error) {
        return;
      }
      this.model.output = results.success as string;
    });
  }
}
