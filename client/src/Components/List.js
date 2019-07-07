import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const { list } = props;

  console.log(list);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {Object.keys(list).map(value => {
        return (
          <ListItem
            key={list[value]._id}
            role={undefined}
            dense
            button
            onClick={props.todoComplete(list[value]._id, list[value].done, list[value].text)}
          >
            <ListItemIcon>
              <Checkbox
                checked={list[value].done}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText id={list[value]._id} primary={list[value].text} />
            <ListItemSecondaryAction>
              <IconButton onClick={props.deleteTodo(list[value]._id)} aria-label="Delete" className={classes.margin}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={props.editTodo(list[value]._id, list[value].text)} aria-label="Edit" className={classes.margin}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
