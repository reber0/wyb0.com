---
draft: false
date: 2016-06-04 20:26:21
title: conky 配置
description: 
categories:
  - Linux
tags:
  - software
---

### 0x00 效果
使用软件conky可以在linux上看到系统的运行状态，效果如下：
![conky效果图](/img/post/Conky.png)

### 0x01 安装与配置
1. 先安装conky：  
sudo apt-get install conky

2. 在/home/username/下创建文件.conkyrc

3. 使conky开机自启  
在/etc/profile最下面添加：/usr/bin/conky &

### 0x03 配置文件.conkyrc内容如下
```
# set to yes if you want Conky to be forked in the background
background no
cpu_avg_samples 2
net_avg_samples 2
out_to_console no
# X font when Xft is disabled, you can pick one with program xfontsel
#font 7x12
#font 6x10
#font 7x13
#font 8x13
#font 7x12
#font *mintsmild.se*
#font -*-*-*-*-*-*-34-*-*-*-*-*-*-*
#font -artwiz-snap-normal-r-normal-*-*-100-*-*-p-*-iso8859-1
# Use Xft?
use_xft yes
# Xft font when Xft is enabled
xftfont Sans:size=11  
own_window_argb_visual yes
#own_window_colour hotpink
# Text alpha when using Xft
xftalpha 0.8
# on_bottom yes
# mail spool
mail_spool $MAIL
# Update interval in seconds
update_interval 1
# Create own window instead of using desktop (required in nautilus)
own_window yes
own_window_transparent yes
own_window_hints undecorated,below,sticky,skip_taskbar,skip_pager
#own_window_type override
own_window_type normal
# Use double buffering (reduces flicker, may not work for everyone)
double_buffer yes
# Minimum size of text area
minimum_size 260 5
maximum_width 400
# Draw shades?
draw_shades no
# Draw outlines?
draw_outline no
# Draw borders around text
draw_borders no
# Stippled borders?
stippled_borders no
# border margins
border_margin 4
# border width
border_width 1
# Default colors and also border colors
default_color white
default_shade_color white
default_outline_color white
# Text alignment, other possible values are commented
#alignment top_left
#minimum_size 10 10
gap_x 10
gap_y 35
alignment top_right
#alignment bottom_left
#alignment bottom_right
# Gap between borders of screen and text
# Add spaces to keep things from moving about?  This only affects
# certain objects.
use_spacer none
# Subtract file system buffers from used memory?
no_buffers yes
# set to yes if you want all text to be in uppercase
uppercase no
# none, xmms, bmp, audacious, infopipe (default is none)
# xmms_player bmp


TEXT
${hr 5}
Time:$alignr${time %Y.%m.%d}$alignc ${time %H:%M:%S}$alignr Week:${time %w}
${hr 5}
###############
${color red}SYSTEM ${hr 1}
Hostname: $alignr$nodename
Kernel: $alignr$kernel
Machine:$alignr$machine
Uptime: $alignr$uptime
Temp: ${alignr}${acpitemp} °C
Battery:$alignr${battery BAT0}
###############
${color green}NETWORK ${hr 1}
IP Address:${alignr}${addr eth0}
GateWay:${alignr}$gw_ip
DNS Server:${alignr}${nameserver}
Down ${downspeed eth0} /s ${alignr}Up ${upspeed eth0} /s
#${downspeedgraph eth0 25,107} ${alignr}${upspeedgraph eth0 25,107}
Total ${totaldown eth0} ${alignr}Total ${totalup eth0}
#############
${color purple}MEMORY ${hr 1}
Ram ${alignr}$mem / $memmax ($memperc%)
${membar 4}
swap ${alignr}$swap / $swapmax ($swapperc%)
${swapbar 4}
Highest MEM $alignr MEM%
${top_mem name 1}$alignr ${top_mem mem 1}
${top_mem name 2}$alignr ${top_mem mem 2}
${top_mem name 3}$alignr ${top_mem mem 3}
##############
${color orange}CPU ${hr 1}
Frequency: ${alignr}${freq dyn} MHz
Processes: ${alignr}$processes ($running_processes running)
CPU1 ${alignr}${cpu cpu1}%
${cpubar 4 cpu1}
CPU2 ${alignr}${cpu cpu2}%
${cpubar 4 cpu2}
Highest CPU $alignr CPU%
${top name 1}$alignr${top cpu 1}
${top name 2}$alignr${top cpu 2}
${top name 3}$alignr${top cpu 3}
##############
${color grey}FILE SYSTEM ${hr 1}
Disk I/O:$diskio
/root: ${alignr}${fs_free /} / ${fs_size /}
${fs_bar 4 /}
/home: ${alignr}${fs_free /home} / ${fs_size /home}
${fs_bar 4 /home}
#############
```
