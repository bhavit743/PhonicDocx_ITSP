﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('cambria-normal.ttf', font);
this.addFont('cambria-normal.ttf', 'cambria', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])