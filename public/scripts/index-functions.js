// Client side functions for the home page

// Defining constants
const $bottomMessage = $('span.message');
const $moreButton = $('button.more');

const addQuizSquare = (quiz, title) => {
  return `<a href='/quiz/${quiz.id}'>
  <div class="quiz-tile">
    ${quiz.title}
  </div>
  </a>`;
}

// Sort by the chosen method
const sortQuizzes = (sort) => {
  $.ajax('/', {
    method: 'POST',
    data: {
      getPage: 0,
      sort
    }
  })
  .then((res) => {
    res = JSON.parse(res);
    const $main = $('main');
    // Empty the existing quizzes on the page
    $main.empty();
    if (res.length) {
      for (quiz of res) {
        console.log(quiz);
        $main.append(addQuizSquare(quiz));
      }
    } else {
      $bottomMessage.text('No quizzes found');
    }
    // Reset to page 0 so "load more" button works properly
    $moreButton[0].dataset.currentpage = 0;
    $bottomMessage.text('');
  })
  .catch(err => console.log(err));
};

// Loads next page of quizzes
const loadMore = ($btn, currentPage, sort) => {
  $.ajax('/', {
    method: 'POST',
    data: {
      getPage: currentPage + 1,
      sort
    }
  })
    .then((res) => {
      res = JSON.parse(res);
      // If there are no more results, this will be falsy
      if (res.length) {
        for (quiz of res) {
          console.log(quiz);
          $('main').append(addQuizSquare(quiz));
        }
        $btn[0].dataset.currentpage++;
        // Increment the current page so the next time the button is hit, another N results show
      } else {
        $bottomMessage.text('No more quizzes to show');
      }
    })
    .catch((err) => console.log(err));
}
