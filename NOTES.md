# Building Valhalla from source

## Attempt 1: using Valhalla's docker repo to build 3.0.8 (fail):

Date of writing: *20191010*

* valhalla/docker repository commit e71a445

shell command:
```
./build.sh source 3.0.8
```

Got error:
```
...
/scripts/install_from_source.sh: line 54: ./autogen.sh: No such file or directory
Removing intermediate container 20c2b29f630a
```

Digging into the source code... [scripts/install_from_source.sh](https://github.com/valhalla/docker/blob/5b484f4f00d29f4e71cd20e6215908a9a2093be1/scripts/install_from_source.sh)
```
# get the software installed
git clone \
  --depth=1 \
  --recurse-submodules \
  --single-branch \
  --branch=master \
  https://github.com/valhalla/valhalla.git libvalhalla

cd libvalhalla
./autogen.sh
```

The problem is that `autogen.sh` was removed from valhalla/valhalla in commit [9d3f5a5](https://github.com/availabs/valhalla/commit/9d3f5a5db47be8b9e6a1d518f5cf9bd8af657f6f) _(May 24, 2018)_

So, valhalla/docker won't work for Valhalla versions 2.5.0 or greater: [releases](https://github.com/availabs/valhalla/releases?after=2.6.1)

## Attempt 2: Build from source (success)

See [build_docker_image](build_docker_image) and [Dockerfile](Dockerfile)

# Routing, Matching, and Directionality

## ??? "Duplicate Ways" ???

Does this pertain to the problem of "matched" ways not respecting line directionality?

* [CHANGELOG](https://github.com/valhalla/valhalla/blob/5111f6ee4410c87f980972aeec85cb1efbbecf5a/CHANGELOG.md#release-date-2019-09-06-valhalla-308)
* [ISSUE: Fix duplicate waypoints](https://github.com/valhalla/valhalla/pull/1880)
* [valhalla/mjolnir/dataquality.h](https://github.com/valhalla/valhalla/blob/105edc56c8f3f30025c03a4ca4d7e4c4ea2a6af3/valhalla/mjolnir/dataquality.h#L16-L36)
* [search repo for "duplicate"](https://github.com/valhalla/valhalla/search?q=duplicate&unscoped_q=duplicate)


