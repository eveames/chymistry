<table class="table-cell-bordered" ng-keyup="$event.keyCode == 13 ? handleAnswer() : null"><tbody>
	<col span="18"/>
	<tr><td ng-click="field.answer = '1'">1</td><td colspan="16" class="no-border"></td><td ng-click="field.answer = '2'">2</td></tr>
	<tr><td ng-click="field.answer = '3'">3</td><td ng-click="field.answer = '4'">4</td><td colspan="10" rowspan="2" class="no-border"></td>
		<td ng-click="field.answer = '5'">5</td><td ng-click="field.answer = '6'">6</td><td ng-click="field.answer = '7'">7</td>
		<td ng-click="field.answer = '8'">8</td><td ng-click="field.answer = '9'">9</td><td rowspan="5" ng-click="field.answer = 'NG'">NG</td></tr>
	<tr><td ng-click="field.answer = '11'">11</td><td ng-click="field.answer = '12'">12</td><td ng-click="field.answer = '13'">13</td>
		<td ng-click="field.answer = '14'">14</td><td ng-click="field.answer = '15'">15</td><td ng-click="field.answer = '16'">16</td>
		<td ng-click="field.answer = '17'">17</td></tr>
	<tr><td ng-click="field.answer = '19'">19</td><td ng-click="field.answer = '20'">20</td><td colspan="3" rowspan="3" ng-click="field.answer = 'ETM'">ETM</td>
		<td colspan="3" rowspan="3" ng-click="field.answer = 'MTM'">MTM</td><td colspan="2" rowspan="3" ng-click="field.answer = 'LTM'">LTM</td>
		<td rowspan="3" ng-click="field.answer = 'CM'">CM</td><td colspan="3" rowspan="3" ng-click="field.answer = 'PTM'">PTM</td>
		<td colspan="2" rowspan="3" ng-click="field.answer = 'NM'">NM</td><td rowspan="3" ng-click="field.answer = 'Hal'">Hal</td></tr>
	<tr><td rowspan="2" ng-click="field.answer = 'AM'">AM</td><td rowspan="2" ng-click="field.answer = 'AEM'">AEM</td></tr>
</tbody></table>