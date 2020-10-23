// Client side functions for the home page

$(() => {
  // On document ready
  const $moreButton = $('button.more'); // Should be equated to the button once we have it

  const addQuizSquare = (quiz, title) => {
    return `<a href='/quiz/${quiz.id}'>
    <div class="quiz-tile">
      ${quiz.title}
    </div>
    </a>`;
  }

  $moreButton.on('click', (e) => {
    // The more button should have a data attribute "currentpage" tracking the number of pages that have already been loaded
    $.ajax('/', {
      method: 'POST',
      data: {
        currentPage: $moreButton[0].dataset.currentpage,
        procedure: 'more',
        sort: 'popular'
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
          $moreButton[0].dataset.currentpage++;
          // Increment the current page so the next time the button is hit, another N results show
        } else {
          $moreButton.next().text('No more quizzes to show');
        }
      })
      .catch((err) => console.log(err));
  });

});
