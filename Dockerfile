FROM ubuntu:16.04

# Based on https://github.com/valhalla/docker/blob/master/Dockerfile-build
#   and https://github.com/valhalla/valhalla#building-from-source

# install packages
RUN apt-get update -y && apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:valhalla-core/valhalla && apt-get update -y

RUN apt-get install -y \
    cmake \
    make \
    libtool \
    pkg-config \
    g++ \
    gcc \
    jq \
    lcov \
    protobuf-compiler \
    vim-common \
    libboost-all-dev \
    libboost-all-dev \
    libcurl4-openssl-dev \
    zlib1g-dev \
    liblz4-dev \
    libprime-server0.6.3-dev \
    libprotobuf-dev \
    prime-server0.6.3-bin \
    nodejs \
    npm \
    git

RUN apt-get install -y \
    libgeos-dev \
    libgeos++-dev \
    liblua5.2-dev \
    libspatialite-dev \
    libsqlite3-dev \
    lua5.2 \
    wget

WORKDIR /opt

RUN git clone https://github.com/valhalla/valhalla.git

WORKDIR /opt/valhalla

# commit 8a37731d592fa9503376ce25b7e3deaeaecaf5cc (tag: 3.0.8)
# Author: Duane Gearhart <duane.gearhart@mapbox.com>
# Date:   Sat Sep 7 00:08:19 2019 -0400
# 
#     Update for 3.0.8
RUN git checkout 8a37731d592fa9503376ce25b7e3deaeaecaf5cc
RUN git submodule update --init --recursive

WORKDIR /opt/valhalla/build

RUN cmake .. -DCMAKE_BUILD_TYPE=Release -DENABLE_NODE_BINDINGS=OFF
RUN make -j$(nproc) 
RUN make install

WORKDIR /opt/valhalla
