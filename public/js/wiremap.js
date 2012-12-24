"use strict";

var canvas_wire  = null;
var ctx_wire     = null;

// canvas setup
window.addEventListener("load", setup_wiremap(), false);

// setup wire diagram
function setup_wiremap() {
  canvas_wire = document.getElementById('skeleton');
  ctx_wire    = canvas_wire.getContext('2d');

  ctx_wire.font      = "12pt Arial";
  ctx_wire.fillStyle = 'rgb(0, 0, 0)';
  ctx_wire.lineJoin = "miter";

  ctx_wire.fillText("テスタ", 5, 40);
  ctx_wire.fillText("ルータ", 5, 120);

  ctx_wire.lineWidth = 2;
  ctx_wire.strokeStyle = 'rgb(0, 0, 0)';
  ctx_wire.strokeRect(60, 10, 280, 50);
  ctx_wire.strokeRect(60, 90, 280, 50);

  ctx_wire.lineWidth = 16;
  ctx_wire.strokeStyle = 'rgb(255, 255, 255)';
  ctx_wire.beginPath();
  ctx_wire.moveTo(101, 50);
  ctx_wire.lineTo(101, 100);
  ctx_wire.moveTo(167, 50);
  ctx_wire.lineTo(167, 100);
  ctx_wire.moveTo(233, 50);
  ctx_wire.lineTo(233, 100);
  ctx_wire.moveTo(299, 50);
  ctx_wire.lineTo(299, 100);
  ctx_wire.stroke();
  ctx_wire.closePath();

  ctx_wire.lineWidth = 4;
  ctx_wire.strokeStyle = 'rgb(0, 0, 0)';
  ctx_wire.beginPath();
  ctx_wire.moveTo(101, 50);
  ctx_wire.lineTo(101, 100);
  ctx_wire.moveTo(167, 50);
  ctx_wire.lineTo(167, 100);
  ctx_wire.moveTo(233, 50);
  ctx_wire.lineTo(233, 100);
  ctx_wire.moveTo(299, 50);
  ctx_wire.lineTo(299, 100);
  ctx_wire.stroke();
  ctx_wire.closePath();

  ctx_wire.lineWidth = 4;
  ctx_wire.strokeStyle = 'rgb(255, 255, 255)';
  ctx_wire.beginPath();
  ctx_wire.moveTo(101, 70);
  ctx_wire.lineTo(101, 85);
  ctx_wire.moveTo(167, 65);
  ctx_wire.lineTo(167, 80);
  ctx_wire.moveTo(233, 65);
  ctx_wire.lineTo(233, 80);
  ctx_wire.moveTo(299, 65);
  ctx_wire.lineTo(299, 80);
  ctx_wire.stroke();
  ctx_wire.closePath();

  ctx_wire.lineWidth = 5;

  ctx_wire.strokeStyle = 'rgb(63, 159, 217)';
  ctx_wire.beginPath();
  ctx_wire.moveTo( 91, 70);
  ctx_wire.lineTo(101, 80);
  ctx_wire.lineTo(111, 70);
  ctx_wire.stroke();
  ctx_wire.closePath();

  ctx_wire.strokeStyle = 'rgb(183, 0, 0)';
  ctx_wire.beginPath();
  ctx_wire.moveTo(177, 80);
  ctx_wire.lineTo(167, 70);
  ctx_wire.lineTo(157, 80);
  ctx_wire.stroke();
  ctx_wire.closePath();

  ctx_wire.strokeStyle = 'rgb(86, 172, 86)';
  ctx_wire.beginPath();
  ctx_wire.moveTo(243, 80);
  ctx_wire.lineTo(233, 70);
  ctx_wire.lineTo(223, 80);
  ctx_wire.stroke();
  ctx_wire.closePath();

  ctx_wire.strokeStyle = 'rgb(33, 58, 244)';
  ctx_wire.beginPath();
  ctx_wire.moveTo(309, 80);
  ctx_wire.lineTo(299, 70);
  ctx_wire.lineTo(289, 80);
  ctx_wire.stroke();
  ctx_wire.closePath();

  ctx_wire.lineWidth = 2;
  ctx_wire.strokeStyle = 'rgb(0, 0, 0)';
  ctx_wire.fillRect(86, 23, 30, 24);
  ctx_wire.fillRect(152, 23, 30, 24);
  ctx_wire.fillRect(218, 23, 30, 24);
  ctx_wire.fillRect(284, 23, 30, 24);
  ctx_wire.strokeRect(86, 103, 30, 24);
  ctx_wire.strokeRect(152, 103, 30, 24);
  ctx_wire.strokeRect(218, 103, 30, 24);
  ctx_wire.strokeRect(284, 103, 30, 24);
}

function drawWiremap(s) {
  ctx_wire.lineWidth = 5;

  if (s.tx0.p) {
    ctx_wire.fillStyle   = 'rgb(63, 159, 217)';
    ctx_wire.strokeStyle = 'rgb(63, 159, 217)';
    ctx_wire.fillRect(86, 23, 30, 24);
    ctx_wire.beginPath();
    ctx_wire.moveTo( 91, 70);
    ctx_wire.lineTo(101, 80);
    ctx_wire.lineTo(111, 70);
    ctx_wire.stroke();
    ctx_wire.closePath();
  } else {
    ctx_wire.fillStyle   = 'rgb(0, 0, 0)';
    ctx_wire.strokeStyle = 'rgb(0, 0, 0)';
    ctx_wire.fillRect(86, 23, 30, 24);
    ctx_wire.beginPath();
    ctx_wire.moveTo( 91, 70);
    ctx_wire.lineTo(101, 80);
    ctx_wire.lineTo(111, 70);
    ctx_wire.stroke();
    ctx_wire.closePath();
  }

  if (s.rx1.p) {
    ctx_wire.fillStyle   = 'rgb(183, 0, 0)';
    ctx_wire.strokeStyle = 'rgb(183, 0, 0)';
    ctx_wire.fillRect(152, 23, 30, 24);
    ctx_wire.beginPath();
    ctx_wire.moveTo(177, 80);
    ctx_wire.lineTo(167, 70);
    ctx_wire.lineTo(157, 80);
    ctx_wire.stroke();
    ctx_wire.closePath();
  } else {
    ctx_wire.fillStyle   = 'rgb(0, 0, 0)';
    ctx_wire.strokeStyle = 'rgb(0, 0, 0)';
    ctx_wire.fillRect(152, 23, 30, 24);
    ctx_wire.beginPath();
    ctx_wire.moveTo(177, 80);
    ctx_wire.lineTo(167, 70);
    ctx_wire.lineTo(157, 80);
    ctx_wire.stroke();
    ctx_wire.closePath();
  } 

  if (s.rx2.p) {
    ctx_wire.fillStyle   = 'rgb(86, 172, 86)';
    ctx_wire.strokeStyle = 'rgb(86, 172, 86)';
    ctx_wire.fillRect(218, 23, 30, 24);
    ctx_wire.beginPath();
    ctx_wire.moveTo(243, 80);
    ctx_wire.lineTo(233, 70);
    ctx_wire.lineTo(223, 80);
    ctx_wire.stroke();
    ctx_wire.closePath();
  } else {
    ctx_wire.fillStyle   = 'rgb(0, 0, 0)';
    ctx_wire.strokeStyle = 'rgb(0, 0, 0)';
    ctx_wire.fillRect(218, 23, 30, 24);
    ctx_wire.beginPath();
    ctx_wire.moveTo(243, 80);
    ctx_wire.lineTo(233, 70);
    ctx_wire.lineTo(223, 80);
    ctx_wire.stroke();
    ctx_wire.closePath();
  } 

  if (s.rx3.p) {
    ctx_wire.fillStyle   = 'rgb(33, 58, 244)';
    ctx_wire.strokeStyle = 'rgb(33, 58, 244)';
    ctx_wire.fillRect(284, 23, 30, 24);
    ctx_wire.beginPath();
    ctx_wire.moveTo(309, 80);
    ctx_wire.lineTo(299, 70);
    ctx_wire.lineTo(289, 80);
    ctx_wire.stroke();
    ctx_wire.closePath();
  } else {
    ctx_wire.fillStyle   = 'rgb(0, 0, 0)';
    ctx_wire.strokeStyle = 'rgb(0, 0, 0)';
    ctx_wire.fillRect(284, 23, 30, 24);
    ctx_wire.beginPath();
    ctx_wire.moveTo(309, 80);
    ctx_wire.lineTo(299, 70);
    ctx_wire.lineTo(289, 80);
    ctx_wire.stroke();
    ctx_wire.closePath();
  }
}

