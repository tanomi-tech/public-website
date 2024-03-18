---
title: "How to Easily Improve Your Website's accessibility"
featured_image: a11y.jpg
date: 2024-03-15T04:14:54-08:00
draft: false
weight: 1
author: Josue Arce
authorimage: ../assets/images/josue.png
tags: ['Blog', 'Accessibility']
---

Imagine This: You're strolling through a crowded marketplace, browsing through stalls filled with things you know you probably don't need. But instead of clearly labeled signs and easy-to-navigate pathways, everything's a jumble. You're left feeling frustrated and ready to bail. That's kind of what it's like for folks who need a little extra help when navigating the web.

That's right, we're talking about something super important but often overlooked as web developers - **web accessibility**.

While I can go over the many reasons why it shouldn't be overlooked, and offer up some ways to integrate it into your workflow, I'll be offering some practical tips to get your website on the right track. Let's get started!

## Apply Alt attributes for all images

`alt` attributes make image descriptions accessible to assistive technologies that can be provided to users in many ways.

What you might not know is that `alt` attributes should be applied to **all** images, regardless of whether they're decorative or not.

When there's a no `alt` attribute attached to an `img` element, there's the possibility that some assistive technologies may use the file name or path to represent the image instead. This can negatively impact user's experience because file names or its location may be very long and arbitrary, and are not a reliable source to communicate the image's content.

Empty `alt` attributes on images communicate, at the very least, that they are decorative, provide no information to understand the surrounding content on the page, and assistive technologies usually skip describing it to users.

## Use HTML buttons for actions, and anchors for navigation

We've all seen the markup (or a variation of the code) below:

```html
<!-- 
    Event Handlers on:
    - anchors
    - divs
    - buttons 
-->

<a href="#" onclick="doSomething()">...</a>

<div onclick="doSomething()">...</div>

<button onclick="doSomething()">...</button>
```

Different HTML elements serve different purposes. Overriding their natural behavior and semantics impacts accessibility because users are expecting one thing, and receive another. Let's take keyboard navigation for example: 
- anchors: on focus, the expected behavior is to use the `Enter` key to navigate to a resource.
- divs: are generic containers that're usually used to group related content together, and have no user interaction.
- buttons: on focus, the expected behavior is to use the `Space` and `Enter` key to initiate an action of some kind (e.g submit a form).

Using the correct HTML elements for their intended purposes will not only improve accessibility, but will also reduce the amount of work you have to do to implement what's already baked in.

## Remove focusable elements that are invisible

Off-canvas menus, modals, hidden dropdowns, are examples of a common UI design patterns to conceal information to users and have them toggle when to display it or not.

While these elements are visually hidden away from users current view, there is a possibility that these are still focusable through keyboard navigation.

If the elements are present in the DOM, make sure to tab through the page to make sure it follows a logical tab order and there is no confusion if there are gaps in between tabbing. 

If you've built something custom, try disabling focus and sure they're not keyboard accessible by applying the following attribute: 
```html 
tabindex="-1"
```

## Conclusion

I hope the tips we discussed offered a good baseline to get started on continuing to improve your website's accessibility. 

Accessibility isn't just a feature; it's a mindset. And by embracing it, we're not just improving our websites; we're making a positive impact on people's lives.







