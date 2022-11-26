import React from 'react';

import Container from './App.styled';
import WidgetStatistics from '../WidgetStatistics';
import WidgetSection from '../WidgetSection';
import FeedbackOptions from '../FeedbackOptions';
import Notification from '../Notification';
import { useState } from 'react';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const onLeaveFeedback = option => {
    setFeedback(prevState => {
      return { ...prevState, [option]: prevState[option] + 1 };
    });
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const positiveFeedback = (good / countTotalFeedback()) * 100;
    return Math.round(positiveFeedback);
  };

  return (
    <Container>
      <WidgetSection title="Please leave feedback">
        <FeedbackOptions
          type="button"
          options={Object.keys(feedback)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </WidgetSection>
      <WidgetSection title="Statistics">
        {countTotalFeedback() > 0 ? (
          <WidgetStatistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </WidgetSection>
    </Container>
  );
};

export default App;
