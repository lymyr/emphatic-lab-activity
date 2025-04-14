from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import emoji

nltk.download('vader_lexicon')

app = Flask(__name__)
CORS(app)

sia = SentimentIntensityAnalyzer()

def get_emoji(sentiment_score):
    if sentiment_score >= 0.5:
        # return emoji.emojize(":smiley:", use_aliases=True)
        return "😀" # bandaid fix because it returns ':smiley:'
    elif sentiment_score > 0:
        return emoji.emojize(":slightly_smiling_face:")
    elif sentiment_score == 0:
        return emoji.emojize(":neutral_face:")
    elif sentiment_score > -0.5:
        return emoji.emojize(":slightly_frowning_face:")
    else:
        return emoji.emojize(":angry_face:")

def analyze_text_with_emoji(text):
    sentiment = sia.polarity_scores(text)
    sentiment_score = sentiment['compound']
    matched_emoji = get_emoji(sentiment_score)
    return f"{text} {matched_emoji}"

@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.json.get('text')
    result = analyze_text_with_emoji(text)
    return jsonify({'response': result})

if __name__ == '__main__':
    app.run(debug=True)
