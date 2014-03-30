Image Scramble JS
==============

Basic JavaScript example of scrambling and unscrambling images using matrices.

jQuery is used here only for simpler image uploading.

Scrambling is done like this:

![alt tag](https://raw.github.com/dantarakan/Image-Scramble/gh-pages/instructions.png)

Unscrambling is done in a reciprocal process.

The sizes and positions of the rotated boxes are calculated using integer maths. For example, if the image size is 1000 x 1000 and we are using a 3 x 3 matrix, the box size will be 333 x 333. This will leave one pixel unrotated at the right-hand edge of the image and at the bottom edge.

[Demo](http://dantarakan.github.io/Image-Scramble/)

I implemented this solution in order to unscramble one image, so this is far from perfect.

Current limitations:

1) All images will be squared upon scrambling/unscrambling. So 1024x764 image will turn to 764x764.

2) Example works on Chrome only.

3) No indication of the current progress.

4) When doing scrambling/unscrambling using large martices, the page will become unresponsive and the browser will complain.
