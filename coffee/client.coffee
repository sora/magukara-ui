$ ->
  ws = new WebSocket "ws://127.0.0.1:8081"
  ws.onmessage = (event) ->
    data = JSON.parse event.data
    update_stats data
    draw_wiremap data

  # deserialize nic stats from ws
  #   deserialize (buf, off) ->

  update_stats = (s) ->
    $('div#tx0_frame_size').text       s.tx0.fs
    $('div#tx0_gap').text              s.tx0.g
    $('div#tx0_src_ipaddr').text       s.tx0.si
    $('div#tx0_gw_ipaddr').text        s.tx0.gi
    $('div#tx0_dst_ipaddr').text       s.tx0.di
    $('div#tx0_src_mac').text          s.tx0.sm
    $('div#tx0_dst_mac').text          s.tx0.dm
    $('div#tx0_pps').text              addComma(s.tx0.p)
    $('div#tx0_throughput').text       Math.floor(s.tx0.t / 125000)
    $('div#rx1_latency').text          addComma(s.rx1.l << 3)
    $('div#rx1_pps').text              addComma(s.rx1.p)
    $('div#rx1_throughput').text       Math.floor(s.rx1.t / 125000)
    $('div#rx1_ipaddr').text           s.rx1.i
    $('div#rx2_latency').text          addComma(s.rx2.l << 3)
    $('div#rx2_pps').text              addComma(s.rx2.p)
    $('div#rx2_throughput').text       Math.floor(s.rx2.t / 125000)
    $('div#rx2_ipaddr').text           s.rx2.i
    $('div#rx3_latency').text          addComma(s.rx3.l << 3)
    $('div#rx3_pps').text              addComma(s.rx3.p)
    $('div#rx3_throughput').text       Math.floor(s.rx3.t / 125000)
    $('div#rx3_ipaddr').text           s.rx3.i
    $('td#rx1_map').text               s.rx1.i
    $('td#rx2_map').text               s.rx2.i
    $('td#rx3_map').text               s.rx3.i
    switch s.m 
      when 0x00 then $('div#global_mode').text "STOP"
      when 0x80 then $('div#global_mode').text "Normal"
      when 0x81 then $('div#global_mode').text "Full Route"
      else           $('div#global_mode').text "unknown mode"
    return

  send_command = (cmd, data='') ->
    if cmd is frame_gap
      data = data.value
    ws.send JSON.stringify {"cmd": cmd, "data": data}
    return

#  addComma = (str) ->
#    num = new String str
#    while num != (num = num.replace /^(\d+)(\d{3})/, "$1,$2")

