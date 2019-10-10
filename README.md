# Building Valhalla From Source

Simplified building Valhalla from the source code because /valhalla/docker is broken.

## Instructions

1. Create the docker image for Valhalla 3.0.8

```
./build_docker_image
```

2. Copy one or more OSM PBF files into the data directory.

```
mkdir data
# Copy *.osm.pbf files into data directory
```

3. Configure valhalla and build the tileset

```
./build_valhalla_tileset
```

4. Run Valhalla server on host port 8005

```
./run_valhalla_server
```

## Configuration

To change the port on which Valhalla runs, see the [docker-compose.yml](docker-compose.yml)

