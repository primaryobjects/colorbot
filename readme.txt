ColorBot Neural Network
http://colorbot.herokuapp.com

About

ColorBot Neural Network uses machine learning (ie., artificial intelligence) to learn which pictures are generally red, green, or blue overall. It does this by using a trained neural network, which functions similar to the human brain.

The neural network (we'll call it the 'brain') was initially trained to 100% accuracy on a collection of 258 images. Each image was labeled as being red, green, or blue in nature. The brain used backpropagation to reduce the errors until it arrived at the target accuracy rate.

Once training was complete, the brain tried guessing the color on 470 images that it's never seen before. On this test set, the brain achieved an accuracy of 97.6%. Not bad!

The app uses node.js, mongodb, and twitter bootstrap.