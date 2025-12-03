> Part of Netvision -> Local Area Network Ping Simulator



<!-- header -->

<pre align="center"> 
    _   __     __ _    ___      _           
   / | / /__  / /| |  / (_)____(_)___  ____ 
  /  |/ / _ \/ __/ | / / / ___/ / __ \/ __ \
 / /|  /  __/ /_ | |/ / (__  ) / /_/ / / / /
/_/ |_/\___/\__/ |___/_/____/_/\____/_/ /_/ 

</pre>

<p align="center">
 <h1 align='center'> Local Area Network Ping Simulator </h1>

<br>
 
 <!-- badges for license and status of project -->
<p align="center">
  <a href="https://creativecommons.org/licenses/by-nc/4.0/">
    <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=for-the-badge" alt="License: CC BY-NC 4.0">
  </a>
  <img src="https://img.shields.io/badge/Status-Work%20in%20Progress-orange?style=for-the-badge" alt="Project Status">
</p>

</p>

# Netvision - A System Overview

NetVision is an interactive network-simulation platform built with React and Express. It models how devices communicate inside a Local Area Network (LAN) by combining classic data structures, algorithms, and object-oriented design. Under the hood, NetVision reconstructs low-level networking behaviors—like the Address Resolution Protocol (ARP) and ICMP echo messages—to show how devices resolve MAC addresses, exchange packets, and maintain routing information.

The platform turns these invisible processes into real-time, visual, step-by-step animations. Every ping, ARP request, table update, and packet flow is simulated in the backend and streamed to the frontend through WebSockets.

<br>

NetVision avoids a cluttered, tangled codebase by organizing the system into clear network-feature modules. Each module encapsulates its own device logic, ARP/ICMP operations, utilities, and simulation handlers. This structure keeps the simulation engine predictable, easier to extend, and simple to debug as new protocols or device types are added.

## Below are the basic sub-sections for NetVision

<p>
<a href="comingSoon.md"> Device Classes</a><br>
<a href="comingSoon.md">Frontend Device Components</a><br>
<a href="comingSoon.md">Logs Service</a><br>
<a href="comingSoon.md">Network Service</a>

<p>