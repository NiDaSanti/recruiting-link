export async function getCandidates(req, res) {
  try {
    const db = req.app.locals.db // ✅ correct DB instance
    const rows = await db.all('SELECT * FROM candidates ORDER BY created_at DESC')

    const html = rows.map(candidate => `
      <div class="candidate" id="candidate-${candidate.id}">
        <div>
          <strong>${candidate.first_name} ${candidate.last_name}</strong><br />
          ${candidate.email}
        </div>
        <button 
          hx-delete="/api/dashboard/candidates/${candidate.id}"
          hx-target="#candidate-${candidate.id}"
          hx-swap="outerHTML"
        >
          Delete
        </button>
      </div>
    `).join('')

    res.send(html)
  } catch (error) {
    console.error('Error fetching candidates:', error)
    res.status(500).send('Error loading candidates')
  }
}

export async function deleteCandidate(req, res) {
  try {
    const db = req.app.locals.db // ✅ same fix here
    await db.run('DELETE FROM candidates WHERE id = ?', [req.params.id])
    res.send('')
  } catch (error) {
    console.error('Error deleting candidate:', error)
    res.status(500).send('Failed to delete')
  }
}
