"use strict";

// deserialize nic stats from ws
function deserialize (buf, off) {
  return {
  }
}

// websocket setup
var ws = new WebSocket("ws://127.0.0.1:8081");
ws.onmessage = function (event) {
  var dataJSON = JSON.parse(event.data);
  updateStats(dataJSON);
  drawWiremap(dataJSON);
};

function updateStats(s) {
  // mode
  if      (s.m == 0x80) document.querySelector('div#global_mode').innerText = "Normal";
  else if (s.m == 0x81) document.querySelector('div#global_mode').innerText = "FullRoute";
  else if (s.m == 0x00) document.querySelector('div#global_mode').innerText = "STOP";
  else                  document.querySelector('div#global_mode').innerText = "unknown";
  // stats
  document.querySelector('div#tx0_frame_size').innerText = s.tx0.fs;
  document.querySelector('div#tx0_gap').innerText        = s.tx0.g;
  document.querySelector('div#tx0_src_ipaddr').innerText = s.tx0.si;
  document.querySelector('div#tx0_gw_ipaddr').innerText  = s.tx0.gi;
  document.querySelector('div#tx0_dst_ipaddr').innerText = s.tx0.di;
  document.querySelector('div#tx0_src_mac').innerText    = s.tx0.sm;
  document.querySelector('div#tx0_dst_mac').innerText    = s.tx0.dm;
  document.querySelector('div#tx0_pps').innerText        = addComma(s.tx0.p);
  document.querySelector('div#tx0_throughput').innerText = Math.floor(s.tx0.t / 125000);
  document.querySelector('div#rx1_latency').innerText    = addComma(s.rx1.l << 3);
  document.querySelector('div#rx1_pps').innerText        = addComma(s.rx1.p);
  document.querySelector('div#rx1_throughput').innerText = Math.floor(s.rx1.t / 125000);
  document.querySelector('div#rx1_ipaddr').innerText     = s.rx1.i;
  document.querySelector('div#rx2_latency').innerText    = addComma(s.rx2.l << 3);
  document.querySelector('div#rx2_pps').innerText        = addComma(s.rx2.p);
  document.querySelector('div#rx2_throughput').innerText = Math.floor(s.rx2.t / 125000);
  document.querySelector('div#rx2_ipaddr').innerText     = s.rx2.i;
  document.querySelector('div#rx3_latency').innerText    = addComma(s.rx3.l << 3);
  document.querySelector('div#rx3_pps').innerText        = addComma(s.rx3.p);
  document.querySelector('div#rx3_throughput').innerText = Math.floor(s.rx3.t / 125000);
  document.querySelector('div#rx3_ipaddr').innerText     = s.rx3.i;
  document.querySelector('td#rx1_map').innerText         = s.rx1.i;
  document.querySelector('td#rx2_map').innerText         = s.rx2.i;
  document.querySelector('td#rx3_map').innerText         = s.rx3.i;
}

function change_gap (slider) {
  console.log(slider.value);
  var msg = { 
    "cmd": "frame_gap",
    "data": slider.value
  };
  ws.send(JSON.stringify(msg));
};

var change_fs = function (size) {
  var msg = { 
    "cmd": "frame_size",
    "data": size
  };
  ws.send(JSON.stringify(msg));
};

var mode_normal = function () {
  var msg = { 
    "cmd": "mode",
    "data": 0x80
  };
  ws.send(JSON.stringify(msg));
};

var mode_fullroute = function () {
  var msg = { 
    "cmd": "mode",
    "data": 0x81
  };
  ws.send(JSON.stringify(msg));
};

var mode_stop = function () {
  var msg = { 
    "cmd": "mode",
    "data": 0x00
  };
  ws.send(JSON.stringify(msg));
};

var send_arpreq = function () {
  var msg = { 
    "cmd": "arpreq",
    "data": 0x0c
  };
  ws.send(JSON.stringify(msg));
};

function addComma(str) {
  var num = new String(str);
  while(num != (num = num.replace(/^(\d+)(\d{3})/, "$1,$2")));
return num;
}

