import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 Wonderful! {completedTasksCount} tasks completed
                {activeTasksCount > 0 &&
                  `, and ${activeTasksCount} tasks remaining. Keep it up!`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Let's get started on those {activeTasksCount} tasks!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
