# Homepage hero video

## Source and previous version

- `home-hero-loop.mp4`: unchanged supplied source, 1280×720, 24 fps, 193 frames.
- `home-hero-loop-4k.mp4` and `home-hero-poster-4k.jpg`: previous 3× upscale, retained for comparison and rollback.

## Detail restoration — September 28, 2026

The enhanced version is restored directly from the original 720p video, not from the previous upscale. Each frame is processed with [Real-ESRGAN ncnn Vulkan](https://github.com/xinntao/Real-ESRGAN-ncnn-vulkan), using `realesrgan-x4plus-anime` at 4×. Its 5120×2880 output is downsampled to 3840×2160 with Lanczos for the website.

This is AI-enhanced source material, not a native 4K recording. The original illustration, all 193 frames, 24 fps, and 8.0417-second duration are preserved. No frame interpolation, retiming, or extra motion is added.

### Website files

- `home-hero-detail-4k.mp4`: H.264, CRF 17, slow preset, YUV 4:2:0; universal fallback.
- `home-hero-detail-4k-hevc.mp4`: HEVC Main 10, CRF 20, medium preset, `hvc1` tag; smaller alternative for supporting browsers.
- `home-hero-detail-poster.webp`: matching first frame at 3840×2160, quality 94.

Both videos use explicit BT.709 color metadata, fast-start MP4 metadata, and no audio. A 240-frame maximum keyframe interval with scene-cut insertion disabled keeps the short decorative loop in one GOP, reducing redundant full frames without lowering image quality. Browser source selection picks HEVC when supported and falls back to H.264. The existing first-frame image, muted inline autoplay, loop, and reduced-motion behavior remain in place.

### Reproduction

Extract the original frames losslessly with FFmpeg, preserving source timing:

```sh
ffmpeg -i home-hero-loop.mp4 -fps_mode passthrough source-frames/%06d.png
realesrgan-ncnn-vulkan -i source-frames -o restored-frames \
  -n realesrgan-x4plus-anime -s 4 -t 256 -j 1:2:2 -f png
```

Encode at `-framerate 24`, applying `scale=3840:2160:flags=lanczos:out_color_matrix=bt709`. Set `-color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv`, `-movflags +faststart`, and `-an`, plus the corresponding codec settings above. Keep the source files unchanged.

Confirm the bitstream color metadata as well as the MP4 metadata. The final files use `h264_metadata` / `hevc_metadata` with `colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0`, applied with stream copy so the encoded pixels are not recompressed.

### Local verification

Both final files decode all 193 frames without errors and place the MP4 `moov` atom before `mdat` for fast start. The final H.264 file is 18.17 MiB; HEVC is 11.47 MiB. The H.264 fallback was verified playing at 3840×2160 in the local browser, with the matching poster loaded, muted looping playback, and no console errors. TypeScript and whitespace checks pass. The previous video assets are unchanged. Verification was completed locally before publication.
