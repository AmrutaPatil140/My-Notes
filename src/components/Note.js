import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
export default function Note({ note }) {
  return (
    <ListItem>
      <>
        <ListItemAvatar>
          <Avatar>
            <SpeakerNotesIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={note.title} secondary={note.subject} />

        <IconButton
          color="primary"
          aria-label="upload picture"
          // component="span"
          to={`/viewnote/${note.key}`}
          component={Link}
        >
          <VisibilityIcon />
        </IconButton>
      </>
    </ListItem>
  );
}
