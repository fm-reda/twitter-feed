import React, { Component } from "react";

export default class Table extends Component {
  render() {
    return (
      <div>
        <h1>Component table</h1>
        <table class="table table-striped table-inverse table-responsive">
          <thead class="thead-inverse">
            <tr>
              <th>a</th>
              <th>b</th>
              <th>c</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">aa</td>
              <td>22</td>
              <td>55</td>
            </tr>
            <tr>
              <td scope="row">aa</td>
              <td>66</td>
              <td>88</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
