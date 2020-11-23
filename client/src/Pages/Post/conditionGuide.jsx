import React from "react";
import { DialogContent, DialogContentText } from "@material-ui/core";

export default function ConditonGuide() {
  return (
    <DialogContent>
      <DialogContentText id="condition-detail">
        <strong>As New:</strong> The book is in the same immaculate condition as
        when it was published. This could be the description for a book that has
        been lost in a warehouse for years, never shelved, thumbed or even
        opened yet may still be some years old. <br />
        <strong>Fine (F or FN):</strong> A Fine book approaches the condition of
        As New, but without being crisp. The book may have been opened and read,
        but there are no defects to the book, jacket or pages. <br />
        Very Good (VG): Describes a book that shows some small signs of wear -
        but no tears - on either binding or paper. Any defects should be noted
        by the seller. <br />
        <strong>Good (G):</strong> Describes the average used worn book that has
        all pages or leaves present. Any defects should be noted by the seller.
        Fair: Worn book that has complete text pages (including those with maps
        or plates) but may lack endpapers, half-title, etc. (which must be
        noted). Binding, jacket (if any), etc., may also be worn. All defects
        should be noted. <br />
        <strong>Poor:</strong> Describes a book that is sufficiently worn. Any
        missing maps or plates should still be noted. This copy may be soiled,
        scuffed, stained or spotted and may have loose joints, hinges, pages,
        etc. <br />
        <strong>Binding Copy:</strong> describes a book in which the pages or
        leaves are perfect but the binding is very bad, loose, off, or
        nonexistent. <br />
        <strong>Reading Copy:</strong> A copy usually in poor to fair condition
        that includes all text presented in a legible fashion. The copy is fine
        to read but nothing more.
      </DialogContentText>
    </DialogContent>
  );
}
