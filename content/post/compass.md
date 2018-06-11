---
date: "2017-04-19T18:10:15-06:00"
title: "Compass Navigation"
tags: ["mathematics","navigation","outdoors"]
draft: false
---

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

1. Rotate the circular housing until North on the housing matches North on the map. If your compass's housing has guide lines, use those to help you find the perfect fit. At this point, your map and compass should look like figure 1, below: 
![Figure 1: line up the compass][03]
*Figure 1: line up the compass and the housing*

1. Pick up your compass. Hold it such that the direction of travel points away from you, relative to you. Turn your body until the magnetic needle lines up with the orienting arrow. Most compasses have red and black halves of their needles, which correspond to the red and black halves of the orienting arrow. Line them up by color, or risk going precisely the wrong direction!
![Follow your bearing][04]
*Figure 2: orient yourself to the bearing you just took*

1. Walk in the direction of travel indicated by your compass.

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

Once again, we will take a bearings, but this time we're simply going to reverse-engineer our location. We can imagine ourselves somewhere on the 2D plane of our map, so there are two dimensions of uncertainty. With each bearing, we'll reduce the span of our possible locations by one dimension. Thus, after only two iterations, we will be left with a single point---our location.

### The Technique

1. Identify at least two (preferably three) distinct features of the landscape. You need to be able to see the feature and point to it rather precisely.

1. Point your compass's direction of travel arrow at the feature. Then, rotate the housing so that it aligns with the magnetic arrows.
![Line it up][08]
*Figure 3: align the compass with the feature, then the housing with the needles*

1. Read your bearing, which is measured in degrees.
![Read your bearing][09]
*Figure 4: the index arrow will point at the bearing measurement on the housing*

1. Apply your bearing to the map. To do so, with the bearing still set on your compass, line up the edge of the compass with the landmark and turn the entire compass (remember: don't turn the housing now!) until compass North aligns with map North. You are somewhere on this line!
![Apply your bearing][10]
*Figure 5: applying the bearing reduces your uncertainty by a whole dimension!*

1. Repeat steps 2, 3, and 4 for at least one more landmark.
![Another bearing][11]
*Figure 6: take another bearing*
![Another bearing][12]
*Figure 7: apply it to the map*

1. After applying just two bearings to the map, you know exactly where you are---or, at least, where you should be. There is one case where this will fail:  if you select linearly dependent landmarks, you can end up with the same line twice, which obviously doesn't help! (We need intersections, not parallel lines.)  Therefore, for optimal results, try finding landmarks that might product nearly orthogonal bearings.
![You are here][13]
*Figure 7: applying two bearings to the map puts you somewhere on each of two intersecting lines, which only share one point.*

In practice, it's common to take a third bearing in the same fashion, assuming a third feature can be identified. Ideally, the third bearing would perfectly intersect the point we've isolated. However, because we are not perfect, we're likely to end up with a triangle, inside which we are located. The smaller the triangle, the better, of course!

**Note:** You may only need one bearing! For example, if you are standing at a river, which you can accurately identify, then for all intents and purposes, you only have one dimension of uncertainty: the distance along the river.

When will that approach work? More importantly, when might it *not* work? *(Hint: two straight lines intersect with each other at most once; however, that might not be true of a straight line and a curve.)*

### The Idea

We've already covered the big idea here:  each bearing constitutes a dimensionality reduction by either placing us on some line where before we were on a plane, or placing us on some point where before we were on a line.

No need for fancy maths for this idea. Rather, we need only use our imagination to plant ourselves on the map and think critically about what we're measuring when we take a bearing.

Pointing the direction of travel arrow precisely at a landmark creates a line, but a line must be defined by two points, not just one; after all, there are infinite lines extending from the landmark you've chosen.  So what is the other point?  You are, of course!  In real life, the imaginary line runs between you and the landmark.

To translate that line from the real world to the two-dimensional plane of the map requires one shared bit of knowledge:  North.  The idea of a map is that North on the map matches North in real life.  When we align compass North (**N<sub>COMPASS</sub>**) to real-life North (**N<sub>REAL</sub>**) by rotating the housing until the needles match up, then rotate the entire compass on the map until compass North (**N<sub>COMPASS</sub>**) matches map North (**N<sub>MAP</sub>**), we've essentially constructed an associative relationship between true North and map North.


**N<sub>COMPASS</sub> = N<sub>REAL</sub>**  
**N<sub>COMPASS</sub> = N<sub>MAP</sub>**  
**&rArr; N<sub>REAL</sub> = N<sub>MAP</sub>**  

Once that relationship is established, we have something powerful:  if North is the same, then all directions are the same.  North is just 0&deg; (or 0&deg; + 360*X, to be more precise).  That is: generally, for any degree measurement (or bearing) d&deg;, d&deg; in real life will correspond to d&deg; on the map. That allows us to translate our bearings to the map, then the intersection point of the map back to real-life knowledge of our location.

We did it!  But we still have some explaining to do.

<a name="declination">
## Declination
</a>

No doubt you have noticed it---why is my orienting arrow mis-aligned with North on the housing? Am I being sloppy? No, of course not! As it turns out, there are two Norths:  magnetic North and true North. We need to work with true North, but alas, true North is not magnetic---magnetic North is! Therefore, the magnetic needle of our compass will stray somewhat from true North.

The angle at which magnetic North differs from true North depends on where on the Earth you happen to be standing. That amount is called **declination**. Before using a compass for either of the techniques discussed above, a responsible navigator should look up the latest declination measurement for their given location and set it on your compass.

The technique of setting the declination differs on different compass models, but generally the idea is simply to align magnetic North (**N<sub>MAGNETIC</sub>**) to real North (**N<sub>REAL</sub>**). To convince ourselves that the reasoning we've done so far still holds, observe the new associative chain:

**N<sub>COMPASS</sub> = N<sub>MAGNETIC</sub>**  
**N<sub>COMPASS</sub> = N<sub>MAP</sub>**  
**N<sub>REAL</sub> = N<sub>MAGNETIC</sub>**  
**&rArr; N<sub>REAL</sub> = N<sub>MAGNETIC</sub> = N<sub>MAP</sub>**  

**Think:**  without setting declination, what would happen?  All of your bearings would be off by exactly the declination amount.  Where I live, declination is +8&deg;, which is certainly enough to send you in a very wrong direction.

## Credit, Reference, Related

1. [Recreational Equipment, Inc.](https://www.rei.com/c/compasses) has you covered if you are more of a video-learner and/or are in need of a compass.
<div class="iframe-container ic169">
  <iframe src="https://www.youtube.com/embed/0cF0ovA3FtY" frameborder="0"></iframe>
</div>

2. [summitpost.org](http://www.summitpost.org/compass-basics-an-introduction-to-orientation-and-navigation/358187) has a fairly complete guide, including extra tips regarding navigating around obstacles.

3. [magnetic-declination.com](http://www.magnetic-declination.com/) will help you discover the declination for your area.

[01]: /images/compass/2017-04-12-compass-01.jpg
[02]: /images/compass/2017-04-12-compass-02.jpg
[03]: /images/compass/2017-04-12-compass-03.jpg
[04]: /images/compass/2017-04-12-compass-04.jpg
[05]: /images/compass/2017-04-12-compass-05.jpg
[06]: /images/compass/2017-04-12-compass-06.jpg
[07]: /images/compass/2017-04-19-compass-07.jpg
[08]: /images/compass/2017-04-19-compass-08.jpg
[09]: /images/compass/2017-04-19-compass-09.jpg
[10]: /images/compass/2017-04-19-compass-10.jpg
[11]: /images/compass/2017-04-19-compass-11.jpg
[12]: /images/compass/2017-04-19-compass-12.jpg
[13]: /images/compass/2017-04-19-compass-13.jpg
