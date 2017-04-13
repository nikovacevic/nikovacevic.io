+++
date = "2017-04-12T18:10:15-06:00"
title = "Compass Navigation"
tags = ["navigation","outdoors","survival","trigonometry"]
+++

I meet a lot of people who own a compass, but few who are well-versed in how to use one. Luckily, the geometric nature of compass navigation makes this not only a survival lesson, but a trigonometry lesson! Perhaps that's a stretch, but I make the rules here, so it counts.

![Compass][01]

Properly using a compass, in tandem with a map and a bit of prior knowledge (see [declination]({{< relref "#declination" >}})) can help you answer two essential questions: 

1. [I know where I am, but how do I get there?]({{< relref "#get-there" >}}) 
1. [I know where that is, but where am I?]({{< relref "#where-am-i" >}})

<a name="get-there">
## I know where I am, but how do I get there?
</a>

You are a small black dot traversing a barren, white landscape of perfectly-spaced, smaller, gray dots. Luckily, you brought a compass and you know exactly where you are.

![How do I get there?][02]

### The Technique

The technique is simple; the idea is even simpler. But first, the technique:

1. Line up the edge of the compass's base plate so that one side rests on the line between where you are and where you need to go. That is, point the direction of travel in the direction you want to travel.

2. Rotate the circular housing until North on the housing matches North on the map. If your compass's housing has guide lines, use those to help you find the perfect fit. At this point, your map and compass should look like figure 1, below: 
![Figure 1: line up the compass][03]
*Figure 1: line up the compass and the housing*

3. Pick up your compass. Hold it such that the direction of travel points away from you, relative to you. Turn your body until the magnetic needle lines up with the orienting arrow. Most compasses have red and black halves of their needles, which correspond to the red and black halves of the orienting arrow. Line them up by color, or risk going precisely the wrong direction!
![Follow your bearing][04]
*Figure 2: orient yourself to the bearing you just took*

4. Walk in the direction of travel indicated by your compass.

See, very simple! However, don't take my word for it. Let's show why it works by unpacking the idea.

### The Idea

The map represents you and your world on a Cartesian plane. We can break down the aforementioned technique into a simple trigonometry problem to prove to ourselves why it works.

By aligning your compass in step 2, we're placing ourselves at the origin, then measuring the angle **&Theta;** between North and our intended destination.

![Theta][05]

Then, by pointing the compass's direction of travel forward and turning until the compass's needle is pointing North, we're lining up our line of vision to the line extending at the angle **&Theta;**.

Better yet, we can use the dot-matrix example to double-check that the measurement we took works:

![Check your answer][06]
*Figure 3: it works!*

<a name="where-am-i">
## I know where that is, but where am I?
</a>

Uh oh. Now you're lost in the dot matrix. Luckily, you still have your compass, and you can recognize some distinct features on the landscape.

![Where am I?][07]

Once again, we will take a bearings, but this time we're simply going to reverse-engineer our location. We have two axes of uncertainty: East/West (or the X-axis) and North/South (or the Y-axis). With each bearing, we'll reduce the span of our possible locations by one dimension. After only two iterations, we will be left with a single point!

### The Technique

1. 

In practice, it's common to take a third bearing in the same fashion, assuming a third feature can be identified. Ideally, the third bearing would perfectly intersect the point we've isolated. However, because we are not perfect, we're likely to end up with a triangle, inside which we are located. The smaller the triangle, the better, of course!

Note: You may only need one bearing! For example, if you are standing at a river, then for all intents and purposes, you only have one dimension of uncertainty, that being the distance along the river. When will that approach work? More importantly, when might it *not* work?

### The Idea

<a name="declination">
## Declination
</a>

Now, why is my orienting arrow mis-aligned with North on the housing? Am I being sloppy? No, of course not! As it turns out, there are two Norths:  magnetic North and true North. We need to work with true North, but alas, true North is not magnetic--magnetic North is! Therefore, the magnetic needle of our compass will stray somewhat from true North.

The angle at which magnetic North differs from true North depends on where on the Earth you happen to be standing. That amount is called **declination**. Before using a compass for either of the techniques discussed above, a responsible navigator should look up the latest declination measurement for their given location and set it by ___;

## Credit, Reference, Related

1. [Recreational Equipment, Inc.](https://www.rei.com/c/compasses) has you covered if you are more of a video-learner and/or are in need of a compass.
<div class="iframe-container ic169">
  <iframe src="https://www.youtube.com/embed/0cF0ovA3FtY" frameborder="0"></iframe>
</div>

2. [summitpost.org](http://www.summitpost.org/compass-basics-an-introduction-to-orientation-and-navigation/358187) has a fairly complete guide, including extra tips regarding navigating around obstacles.

[01]: /images/compass/2017-04-12-compass-01.jpg
[02]: /images/compass/2017-04-12-compass-02.jpg
[03]: /images/compass/2017-04-12-compass-03.jpg
[04]: /images/compass/2017-04-12-compass-04.jpg
[05]: /images/compass/2017-04-12-compass-05.jpg
[06]: /images/compass/2017-04-12-compass-06.jpg
